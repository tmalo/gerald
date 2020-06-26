const { Text, Slug, Relationship } = require("@keystonejs/fields");
const { atTracking } = require("@keystonejs/list-plugins");

const siteSchema = {
  labelField: "libelle",
  fields: {
    libelle: {
      type: Text,
      isRequired: true,
    },
    url: {
      type: Slug,
      from: "libelle",
    },
    adresse_rue: {
      type: Text,
    },
    adresse_codepostal: {
      type: Text,
    },
    adresse_ville: {
      type: Text,
    },
    adresse_pays: {
      type: Text,
    },
    contrat: {
      type: Relationship,
      ref: "Contrat.sites",
      many: false,
    },
    usagers: {
      type: Relationship,
      ref: "Usager.site",
      many: true,
      isRequired: false,
    },
  },

  plugins: [
    atTracking(),
    //byTracking(),
  ],
};

const createList = (keystone) => {
  var siteList = keystone.createList("Site", siteSchema);
  return siteList;
};
module.exports = createList;
