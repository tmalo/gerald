const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { StaticApp } = require('@keystonejs/app-static');
const userList = require('./lists/user.js');
const contratList = require('./lists/contrat.js');
const siteList = require('./lists/site.js');
const usagerList = require('./lists/usager.js');
const conversationList = require('./lists/conversation.js');
const demandeList = require('./lists/demande.js');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const config = require('config')

const PROJECT_NAME = 'Gerald';
const adapterConfig = { 
  mongoUri: config.db.connectionString
};


const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
  //onConnect: process.env.CREATE_TABLES !== 'true' && initialiseData,
  //openssl rand -hex 32
  cookieSecret: config.auth.cookieSecret,
});

userList(keystone);
contratList(keystone);
siteList(keystone);
demandeList(keystone);
conversationList(keystone);
usagerList(keystone);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: false,
      authStrategy,
    }),
    new StaticApp({
      path: '/',
      src: 'public',
      fallback: 'index.html',
    }),
  ],
  configureExpress: app => {
    if (process.env.NODE_ENV !== 'production') {
      const webpackDevMiddleware = require('webpack-dev-middleware');
      const webpackHotMiddleware = require('webpack-hot-middleware');
      const webpack = require('webpack');
      const webpackConfig = require('../webpack.midleware.config');

      const compiler = webpack(webpackConfig);

      app.use(webpackDevMiddleware(compiler, {
        hot: true,
        publicPath: webpackConfig.output.publicPath,
      }));

      app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
      }));

      }  
  
    },
  

};
