import React, { Component } from "react";
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
const subscribeToNewLinks = props => {
  props.feedQuery.subscribeToMore({
    document: gql`
      subscription {
        newLink {
          node {
            __typename
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
    `,
    updateQuery: (previous, { subscriptionData }) => {
      const newLinks = [
        ...previous.feed.links,
        subscriptionData.data.newLink.node
      ];
      const result = {
        ...previous,
        feed: {
          ...previous.feed,
          links: newLinks
        }
      };

      console.log("UPDATING SUB", previous, result);
      return result;
    }
  });
};

export const renderLink = (link, index) => (
  <Link key={link.id} link={link} index={index} />
);
export class LinkListWithSub extends Component {
  componentDidMount() {
    subscribeToNewLinks(this.props);
  }
  render() {
    return <LinkList {...this.props} />;
  }
}
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

export default graphql(GET_LINKS, { name: "feedQuery" })(LinkListWithSub);
