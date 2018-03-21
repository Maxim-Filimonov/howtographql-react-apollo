import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Link from "./Link";

export const GET_LINKS = gql`
  query FeedQuery {
    feed {
      links {
        id
        description
        url
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export const renderLink = (link, index) => (
  <Link key={link.id} link={link} index={index} />
);
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

export default graphql(GET_LINKS, { name: "feedQuery" })(LinkList);
