
const myDemandes = async (parent, args, context, info, extra) => {
  // get id
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
      ) {
        id
        _label_
        slug
        subject
        etape
        difficulte
        date_reponse
        createdAt
            
      }
    }
      `,
    variables: {
      conseiller: userId
    }
  }); 

  console.log(JSON.stringify(rep2))

  return rep2.data.allDemandes;
};

const extendGraphQL = (keystone) => {
  keystone.extendGraphQLSchema({
    queries: [
      {
        schema: "myDemandes: [Demande]",
        resolver: myDemandes,
      },
    ],
  });
};
module.exports = extendGraphQL;
