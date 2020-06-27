const ora = require("ora");
const ciInfo = require("ci-info");
const devnull = require("dev-null");
const path = require("path");

const { executeDefaultServer } = require('./utils');
const entryFile = path.resolve(__dirname, "server.config.js");

const spinner = ora({
  text: "Initialising Keystone CLI",
  // Don't show any loading output on CI
  ...(ciInfo.isCI && { stream: devnull() }),
}).start();
spinner.start(' ');
return executeDefaultServer(entryFile, 'dist', spinner);

