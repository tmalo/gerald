var forky = require("forky");
forky({
  workers: process.env.WEB_CONCURRENCY || 1,
  path: __dirname + "/worker.js",
});
