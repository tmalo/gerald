import ApolloClient from "apollo-boost";
import { default as typeDefs } from "api/local/typeDefs.js";

const def_user = {
  isLoggedIn: !!localStorage.getItem("token"),
};

const client = new ApolloClient({
  uri: "/api",
  connectToDevTools: process.env.NODE_ENV === "development",
  clientState: {
    defaults: def_user,
    typeDefs: typeDefs,
  },
  request: (operation) => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
});

export default client;
