const {
  Integer,
  Text,
  Select,
  CalendarDay,
  Relationship,
} = require("@keystonejs/fields");
const { Content } = require("@keystonejs/field-content");
const { atTracking, byTracking } = require("@keystonejs/list-plugins");
const moment = require("moment");
const enums = require("../enums");

function NextBusinessDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  while (![1, 2, 3, 4, 5, 6].includes(result.getDay()))
    result.setDate(result.getDate() + 1);
  return result;
}

const beforeDemandeChange = async ({
  operation,
  existingItem,
  originalInput, // eslint-disable-line no-unused-vars
  resolvedData,
  context, // eslint-disable-line no-unused-vars
  actions: { query },
}) => {
  const queryString = `
    query getUser($usager: ID!) {
      Usager(where: { id: $usager }) {
        nom
        prenom
      }
    }
      `;

  const newItem = existingItem ? existingItem : resolvedData;
  const usagerID = newItem.usager.toString();

  const options = {
    skipAccessControl: true,
    variables: { usager: usagerID },
  };

  const repQuery = await query(queryString, options);

  // Perform side effects
  // Return values ignored
  var usager = repQuery.data.Usager;
  var name = `${usager.nom.toUpperCase()}-${usager.prenom.toUpperCase()}`;

  var demande_id = 1;
  if (operation === "create") {
    const mutationString = `
    mutation getDemande($usager: ID!) {
      addDemande(id: $usager) {
        demande_id
      }
    }
    
    `;

    const mutation_options = {
      skipAccessControl: true,
      variables: { usager: usagerID },
    };

    var repMutation = await query(mutationString, mutation_options);
    var m_data = repMutation.data;

    demande_id = m_data.addDemande.demande_id;
  } else {
    demande_id = newItem.demande_id || 1;
  }
  var number = demande_id.toString().padStart(3, "0");
  var dateCreated = moment(newItem.createdAt);

  resolvedData.slug = `${dateCreated.format("YYYYMMDD")}-${name}-${number}`;
};

const DemandeSchema = {
  labelField: "slug",
  fields: {
    subject: {
      type: Text,
      isRequired: true,
    },
    slug: {
      type: Text,
      access: {
        create: false,
        read: true,
        update: false,
      },
    },
    demande_id: {
      type: Integer,
      defaultValue: 1,
      access: {
        create: false,
        read: true,
        update: false,
      },
    },
    etape: {
      type: Select,
      options: enums.Etape_options,
      dataType: "integer",
      defaultValue: 1,
      isRequired: true,
    },
    difficulte: {
      type: Select,
      options: enums.Difficulte_options,
      dataType: "string",
    },
    date_reponse: {
      type: CalendarDay,
      format: "DD/MM/YYYY",
      yearRangeFrom: 2020,
      defaultValue: NextBusinessDays(new Date(), 3)
        .toISOString("DD/MM/YYYY")
        .substring(0, 10),
    },
    commentaire: {
      type: Content,
    },
    usager: {
      type: Relationship,
      ref: "Usager.demandes",
      many: false,
      isRequired: true,
    },
    conseiller: {
      type: Relationship,
      ref: "User",
      isRequired: true,
    },
  },
  hooks: {
    // Hooks for create and update operations
    beforeChange: beforeDemandeChange,
  },

  plugins: [atTracking(), byTracking()],
};

const myDemandes = async (_a, { id }, _b, _c, { query }) => {
  const {
    errors, // eslint-disable-line no-unused-vars
    data,
  } = await query(`
  query {
      allDemandes(
        where: { conseiller: { id: "${id}" } }
        orderBy: "createdAt_DESC"
      ) {
        id
        _label_
        slug
        subject
        etape
        difficulte
        date_reponse
        createdAt
        conseiller {
          id
          _label_
        }
      }
    }
  `);

  return data.allDemandes;
};

const createList = (keystone) => {
  var demandeList = keystone.createList("Demande", DemandeSchema);

  keystone.extendGraphQLSchema({
    queries: [
      {
        schema: "myDemandes(id: ID!): [Demande]",
        resolver: myDemandes,
      },
    ],
  });

  return demandeList;
};
module.exports = createList;
