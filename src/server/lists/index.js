const userList = require("./user.js");
const contratList = require("./contrat.js");
const siteList = require("./site.js");
const usagerList = require("./usager.js");
const conversationList = require("./conversation.js");
const demandeList = require("./demande.js");


const declareLists = (keystone) => {
  userList(keystone);
  contratList(keystone);
  siteList(keystone);
  demandeList(keystone);
  conversationList(keystone);
  usagerList(keystone);  
};

module.exports = {declareLists};