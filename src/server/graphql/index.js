const mesDemandes = require("./mesDemandes.js");

const extendGraphQLSchema = (keystone) => {
  mesDemandes(keystone);
};

module.exports = { extendGraphQLSchema };
