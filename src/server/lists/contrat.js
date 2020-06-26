const { Text, Select, CalendarDay, Slug, Relationship } = require("@keystonejs/fields");
const { atTracking } = require("@keystonejs/list-plugins");
const enums = require("../enums");

const ContratSchema = {
  labelField: "societe",
  fields: {
    societe: {
      type: Text,
      isRequired: true,
    },
    url: {
      type: Slug,
      from: "societe",
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
    type_contrat: {
      type: Select,
      options: enums.ContratType_options,
    },
    date_signature: {
      type: CalendarDay,
      format: "DD/MM/YYYY",
      yearRangeFrom: 2020,
    },
    date_lancement: {
      type: CalendarDay,
      format: "DD/MM/YYYY",
      yearRangeFrom: 2020,
    },
    date_cloture: {
      type: CalendarDay,
      format: "DD/MM/YYYY",
      yearRangeFrom: 2020,
    },
    sites: {
      type: Relationship,
      ref: "Site.contrat",
      many: true,
    },
    usagers: {
      type: Relationship,
      ref: "Usager.contrat",
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
  var contratList = keystone.createList("Contrat", ContratSchema);

  return contratList;
};
module.exports = createList;
