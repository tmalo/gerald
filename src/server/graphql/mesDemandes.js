const mesDemandes = async (parent, args, context, info) => {
  const rep = await context.executeGraphQL({
    query: `
    query {
      authenticatedUser {
        id
      }
    }  
      `,
  });

  const userId = rep.data?.authenticatedUser?.id;

  if (!userId) return null;

  const rep2 = await context.executeGraphQL({
    query: `
    query ($conseiller: ID) {
      allDemandes(
        where: { conseiller: { id: $conseiller} }
        orderBy: "createdAt_DESC"
      ) 
      {
        id
        _label_ 
        subject 
        slug 
        etape 
        difficulte 
        date_reponse 
        usager {
          id
        }        
        updatedAt 
        createdAt 
        updatedBy {
          id
        }
        createdBy {
          id
        }
      
      }

    }
      `,
    variables: {
      conseiller: userId,
    },
  });

  var myData = rep2.data.allDemandes.map((item) => {
    var newItem = { ...item };

    newItem.usager.toString = () => item.usager.id;

    if (newItem.updatedBy) newItem.updatedBy.toString = () => item.updatedBy.id;
    if (newItem.createdBy) newItem.createdBy.toString = () => item.createdBy.id;

    return newItem;
  });

  return myData;
};

const extendGraphQL = (keystone) => {
  keystone.extendGraphQLSchema({
    queries: [
      {
        schema: "mesDemandes: [Demande]",
        resolver: mesDemandes,
      },
    ],
  });
};
module.exports = extendGraphQL;
