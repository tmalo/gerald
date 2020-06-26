const logger = require('@keystonejs/logger').logger("gerald");

const myDemandes = async (parent, args, context, info, extra) => {
  // get id

  var rep = await extra.query(`
  query {
    authenticatedUser {
      id
    }
  }  
  `);

  const userId = rep.data?.authenticatedUser?.id;

  if(!userId)
    return null;

  var { data } = await extra.query(
    `query {
      allDemandes(
        where: { conseiller: { id: "${userId}" } }
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
    `);
    
  return data.allDemandes;
}

const extendGraphQL = (keystone) => {

  keystone.extendGraphQLSchema({
    queries: [
      {
        schema: "myDemandes: [Demande]",
        resolver: myDemandes,
      },
    ],
  });  
}
module.exports = extendGraphQL;