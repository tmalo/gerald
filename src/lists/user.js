const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { atTracking } = require('@keystonejs/list-plugins');

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }

  // Instead of a boolean, you can return a GraphQL query:
  // https://www.keystonejs.com/api/access-control#graphqlwhere
  return { id: user.id };
};

const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};

const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

const UserSchema = {
    fields: {
        name: { type: Text },
        email: {
          type: Text,
          isUnique: true,
        },
        isAdmin: {
          type: Checkbox,
          // Field-level access controls
          // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
          access: {
            update: access.userIsAdmin,
          },
        },
        password: {
          type: Password,
        },
      },
    // List-level access controls
    access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
    },
    plugins: [
        atTracking(),
        //byTracking(),
    ],  
}
const createList = (keystone) => {
  var userList = keystone.createList('User', UserSchema);
  return userList;
}
module.exports = createList;