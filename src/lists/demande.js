const { Integer, Text,Select,CalendarDay, Relationship } = require('@keystonejs/fields');
const { Content } = require('@keystonejs/field-content');
const { atTracking } = require('@keystonejs/list-plugins');
const { format } =require('date-fns');
const logger = require('@keystonejs/logger').logger('usager');

const Etape_options = [
  //0 = pas affecté
  { value: 1, label: "Nouveau" },
  { value: 2, label: "Complet" },
  { value: 3, label: 'Repondu' },
  { value: 4, label: 'Cloturé' },
  { value: -1, label: 'Abandonné' },
];

function NextBusinessDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  while (![1,2,3,4,5,6].includes(result.getDay()))
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
      variables: { "usager": usagerID },
    };

  const repQuery = await query(queryString, options);

  // Perform side effects
  // Return values ignored
  var usager = repQuery.data.Usager;
  var name = `${usager.nom.toUpperCase()}-${usager.prenom.toUpperCase()}`;

  var demande_id = 1;
  if (operation === 'create') {
    const mutationString = `
    mutation getDemande($usager: ID!) {
      addDemande(id: $usager) {
        demande_id
      }
    }
    
    `;

    const mutation_options = {
      skipAccessControl: true,
      variables: { "usager": usagerID },
    };

    var repMutation = await query(mutationString,mutation_options);
    var m_data = repMutation.data;

  demande_id = m_data.addDemande.demande_id;
  } else {
    demande_id = newItem.demande_id || 1;
  }
  var number = demande_id.toString().padStart(3, "0")
  var dateCreated = new Date(newItem.createdAt);

  resolvedData.slug = `${format(dateCreated, 'yyyyMMdd')}-${name}-${number}`
};

const DemandeSchema = {
  labelField: 'slug',
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
        type : Select, 
        options: Etape_options, 
        dataType: 'integer',
        defaultValue: 0,
        isRequired: true
      },
      difficulte : {
        type: Select,
        options: '1, 2, 3', 
        dataType: 'string'
      },
      date_reponse : {
        type: CalendarDay,
        format: 'DD/MM/YYYY',
        yearRangeFrom: 2020,
        defaultValue: NextBusinessDays(new Date(), 3).toISOString('DD/MM/YYYY').substring(0, 10),
      },
      commentaire: {
        type: Content,
      },
      usager: {
        type: Relationship,
        ref: 'Usager.demandes',
        many: false,
        isRequired: true,
      },
      conseiller: {
        type: Relationship,
        ref: 'User',
        isRequired: true,
      },
    },
    hooks: {
      // Hooks for create and update operations
      beforeChange: beforeDemandeChange,
    },
  
    plugins: [
        atTracking(),
        //byTracking(),
    ],  
  };

const myDemandes = async (_a, { id }, _b, _c, { query }) => {
  const {
    errors, data
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

  logger.info(errors);
  logger.info(data);
  return data.allDemandes;
};

  const createList = (keystone) => {
    var demandeList = keystone.createList('Demande', DemandeSchema);


    keystone.extendGraphQLSchema({
      queries: [
        {
          schema: 'myDemandes(id: ID!): [Demande]',
          resolver: myDemandes,
        },
      ],

    });


    return demandeList;
  }
  module.exports = createList;