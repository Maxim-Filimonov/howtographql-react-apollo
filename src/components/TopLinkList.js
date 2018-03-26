import React from "react";
import { GetLinks } from "./queries";
import { graphql } from "react-apollo";
import { Link } from "./Link";
import { LinkListWithSub } from "./LinkList";

export function TopLinkList({
  feedQuery: { loading, error, feed, subscribeToMore }
}) {
  if (loading) return <h1>Loading</h1>;
  else if (feed) {
    const rankedList = feed.links.slice();
    const links = rankedList.sort(
      (l1, l2) => l2.votes.length - l1.votes.length
    );
    return <LinkListWithSub subscribeToMore={subscribeToMore} links={links} />;
  } else if (error) {
    return <div>Something went wrong: {error}</div>;
  }
}

export default graphql(GetLinks, {
  name: "feedQuery",
  options: ({ match, location }) => ({
    variables: { first: 100, skip: 0, orderBy: null }
  })
})(TopLinkList);
