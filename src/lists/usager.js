const { Text, Integer, Relationship } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

const UsagerSchema = {
    labelResolver: item => `${item.prenom} ${item.nom}`,
    fields: {
      nom: {
        type: Text,
        isRequired: true,
      },
      prenom: {
        type: Text,
        isRequired: true,
      },
      telephone: {
        type: Text,
      },
      email: {
        type: Text,
      },
      adresse_rue : {
        type: Text,
    },
    adresse_codepostal : {
      type: Text,
    },
    adresse_ville: {
      type: Text,
    },
    adresse_pays : {
      type: Text,
    },
    contrat: {
          type: Relationship,
          ref: 'Contrat',
          many: false,
          isRequired: true,
      },
      site: {
          type: Relationship,
          ref: 'Site',
          many: false,
      },
       demande_next: {
        type: Integer,
        defaultValue: 1,
        access: {
          create: false,
          read: true,
          update: false,
        },
      },
      demandes: {
        type: Relationship,
        ref: 'Demande.usager',
        many: true,
      },
      conversations: {
        type: Relationship,
        ref: 'Conversation.usager',
        many: true,
      },
    },
    plugins: [
        atTracking(),
        //byTracking(),
    ],  
  };

const createList = (keystone) => {
    var usagerList = keystone.createList('Usager', UsagerSchema);

    const addDemande = async (_, { id }) => {
        const { adapter } = usagerList;
        const oldItem = await adapter.findById(id);

        //logger.info(JSON.stringify(oldItem));

        var demandeid = oldItem.demande_next || 1;
        await adapter.update(id, {
            demande_next: ++demandeid,
          });

        return {
            demande_id : demandeid
        }
    }

    keystone.extendGraphQLSchema({
        types: [
          {
            type: 'type AddDemandeOutput { demande_id: Int! }',
          },
        ],
        mutations: [
            {
                schema: 'addDemande(id:ID!) : AddDemandeOutput',
                resolver: addDemande,
            }
        ]
      });

    return usagerList;
}

module.exports = createList;