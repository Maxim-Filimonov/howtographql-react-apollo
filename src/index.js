import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink, split } from "apollo-client-preset";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter } from "react-router-dom";
import { getToken } from "./components/loginService";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const httplink = new HttpLink({ uri: "http://localhost:4000" });
const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = getToken();
  const authHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authHeader
    }
  });
  return forward(operation);
});
const httpLinkWithAuth = middlewareAuthLink.concat(httplink);
const cache = new InMemoryCache({ dataIdFromObject: o => o.id });

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000",
  options: {
    reconnect: true,
    connectionParams: {
      authToken: getToken()
    }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLinkWithAuth
);

const client = new ApolloClient({ link, cache });

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
