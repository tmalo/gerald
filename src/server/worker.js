const ora = require("ora");
const ciInfo = require("ci-info");
const devnull = require("dev-null");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
const express = require("express");
const { keystone, apps, configureExpress } = require("./server.config.js");

const spinner = ora({
  text: "Initialising Keystone CLI",
  // Don't show any loading output on CI
  ...(ciInfo.isCI && { stream: devnull() }),
}).start();

function extractAppMeta(apps, dev) {
  let adminPath;
  let graphiqlPath;
  let apiPath;

  apps.forEach((app) => {
    switch (app.constructor.name) {
      case "AdminUIApp": {
        adminPath = app.adminPath;
        break;
      }
      case "GraphQLApp": {
        apiPath = app._apiPath;
        graphiqlPath = dev ? app._graphiqlPath : undefined;
        break;
      }
    }
  });

  return {
    adminPath,
    graphiqlPath,
    apiPath,
  };
}

keystone
  .prepare({
    apps: apps,
    dev: process.env.NODE_ENV !== "production",
  })
  .then(async ({ middlewares }) => {
    const port = process.env.PORT || 3000;
    const dev = process.env.NODE_ENV !== "production";

    let status = "start-server";

    spinner.text = "Starting Keystone server";
    const app = express();

    app.use(compression());
    app.use(helmet());

    const sendFile_options = {
      root: path.join(__dirname, "../public"),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true,
      },
    };

    app.use((req, res, next) => {
      if (status === "started") {
        next();
      } else {
        res.format({
          default: () => res.sendFile("loading.html", sendFile_options),
          "text/html": () => res.sendFile("loading.html", sendFile_options),
          "application/json": () => res.json({ loading: true, status }),
        });
      }
    });

    const { server } = await new Promise((resolve, reject) => {
      const server = app.listen(port, (error) => {
        if (error) {
          return reject(error);
        }
        return resolve({ server });
      });
    });

    spinner.succeed(`Keystone server listening on port ${port}`);
    spinner.text = "Initialising Keystone instance";

    status = "init-keystone";

    // Allow the spinner time to flush its output to the console.
    await new Promise((resolve) => setTimeout(resolve, 100));

    configureExpress(app);

    spinner.succeed("Initialised Keystone instance");

    status = "db-connect";

    spinner.start("Connecting to database");
    await keystone.connect();
    spinner.succeed("Connected to database");

    spinner.start("Preparing to accept requests");

    app.use(middlewares);
    status = "started";
    spinner.succeed(`Keystone instance is ready at http://localhost:${port} 🚀`);

    const { adminPath, graphiqlPath, apiPath } = extractAppMeta(apps, dev);

    /* eslint-disable no-unused-expressions */
    adminPath && spinner.succeed(`Keystone Admin UI: ${adminPath}`);
    graphiqlPath && spinner.succeed(`GraphQL Playground: ${graphiqlPath}`);
    apiPath && spinner.succeed(`GraphQL API:\t ${apiPath}`);
    /* eslint-enable no-unused-expressions */

    return { port, server };
  });
