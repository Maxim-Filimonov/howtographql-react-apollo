import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

const link = new HttpLink({ uri: "http://localhost:4000" });
const cache = new InMemoryCache();

const client = new ApolloClient({ link, cache });

client
  .query({
    query: gql`
      query FeedQuery {
        feed {
          links {
            id
            createdAt
            description
            url
          }
        }
      }
    `
  })
  .then(res => console.log("GQL:", res.data.feed));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
