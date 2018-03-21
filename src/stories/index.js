import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import CreateLink from "../components/CreateLink";
import { LinkList } from "../components/LinkList";
import Header from "../components/Header";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter } from "react-router-dom";
import "tachyons/css/tachyons.min.css";

const link = new HttpLink({ uri: "http://localhost:4000" });
const cache = new InMemoryCache();

const client = new ApolloClient({ link, cache });

storiesOf("CreateLink", module)
  .add("Just a link", () => <CreateLink />)
  .add("With Apollo", () => (
    <ApolloProvider client={client}>
      <CreateLink />
    </ApolloProvider>
  ));

storiesOf("LinkList", module).add("With Static Links", () => (
  <LinkList
    feedQuery={{
      loading: false,
      feed: {
        links: [
          {
            url: "test.com",
            description: "blabla"
          },
          {
            url: "google.com",
            description: "Check out this new search engine"
          }
        ]
      }
    }}
  />
));

storiesOf("Header", module).add("Normal", () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
));
