import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "/api",
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
