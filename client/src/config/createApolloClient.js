import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("Network Error", networkError);

      if (networkError.statusCode === 401) {
        localStorage.removeItem("token");
      }
    }
  }
});

export default client;
