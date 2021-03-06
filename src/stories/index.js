import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import CreateLink from "../components/CreateLink";
import LinkList from "../components/LinkList";
import TopLinkList from "../components/TopLinkList";
import { Search } from "../components/Search";
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

storiesOf("LinkList", module).add("The Top", () => (
  <ApolloProvider client={client}>
    <TopLinkList />
  </ApolloProvider>
));

storiesOf("Header", module).add("Normal", () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
));

storiesOf("Search", module).add("Default", () => <Search />);
