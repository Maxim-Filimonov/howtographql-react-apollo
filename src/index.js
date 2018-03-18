import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-client-preset";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter } from "react-router-dom";
import { getToken } from "./components/loginService";

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
const link = middlewareAuthLink.concat(httplink);
const cache = new InMemoryCache();

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
