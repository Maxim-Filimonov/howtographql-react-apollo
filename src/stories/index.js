import React from "react";

import CreateLink from "../components/CreateLink";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const link = new HttpLink({ uri: "http://localhost:4000" });
const cache = new InMemoryCache();

const client = new ApolloClient({ link, cache });

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>😀 😎 👍 💯</Button>
  ));

storiesOf("CreateLink", module)
  .add("Just a link", () => <CreateLink />)
  .add("With Apollo", () => (
    <ApolloProvider client={client}>
      <CreateLink />
    </ApolloProvider>
  ));
