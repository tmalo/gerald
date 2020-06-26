const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { StaticApp } = require("@keystonejs/app-static");
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const config = require("../config.js");
const lists = require("./lists");
const extraGraphQL = require("./graphql");

const PROJECT_NAME = "Gerald";
const adapterConfig = {
  mongoUri: config.db.connectionString,
};

mongoose.connect(config.db.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10, // Maintain up to 10 socket connections
});

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
});

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
  sessionStore: sessionStore,
  //onConnect: process.env.CREATE_TABLES !== 'true' && initialiseData,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Defaults to true in production
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    sameSite: false,
  },
  //openssl rand -hex 32
  cookieSecret: config.auth.cookieSecret,
});

lists.declareLists(keystone);
extraGraphQL.extendGraphQLSchema(keystone);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  config: {
    identityField: "email",
    secretField: "password",
    protectIdentities: true,
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp({
      apiPath: "/api",
    }),
    new AdminUIApp({
      apiPath: "/api",
      enableDefaultRoute: false,
      authStrategy,
    }),
    new StaticApp({
      path: "/",
      src: "build",
      fallback: "index.html",
    }),
  ],
  configureExpress: (app) => {
    app.set("trust proxy", 1);
  },
};
