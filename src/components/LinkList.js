import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Link from "./Link";

const QUERY = gql`
  query FeedQuery {
    feed {
      links {
        id
        description
        url
      }
    }
  }
`;

const renderLink = link => <Link key={link.id} link={link} />;
export function LinkList({ feedQuery: { loading, error, feed } }) {
  if (loading) return <h1>Loading</h1>;
  if (feed) {
    return <div>{feed.links.map(renderLink)}</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  return <h1>DEFAULT</h1>;
}

export default graphql(QUERY, { name: "feedQuery" })(LinkList);
