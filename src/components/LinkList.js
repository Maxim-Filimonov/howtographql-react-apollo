import React, { Component } from "react";
import { graphql } from "react-apollo";
import Link from "./Link";
import { GetLinks, SubscriptionNewLink, SubscriptionNewVote } from "./queries";

const subscribeToNewVotes = props => {
  props.feedQuery.subscribeToMore({
    document: SubscriptionNewVote
  });
};

const subscribeToNewLinks = props => {
  props.feedQuery.subscribeToMore({
    document: SubscriptionNewLink,
    updateQuery: (previous, { subscriptionData }) => {
      const newLinks = [
        ...(previous.feed !== undefined ? previous.feed.links : {}),
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
    subscribeToNewVotes(this.props);
  }
  render() {
    return <LinkList {...this.props} />;
  }
}
const getLinksToRender = (feed, newPage) => {
  if (newPage) {
    return feed.links;
  } else {
    const rankedList = feed.links.slice();
    rankedList.sort((l1, l2) => l2.votes - l1.votes.length);
    return rankedList;
  }
};
const previousPage = (match, history) => () => {
  let page = getCurrentPage(match);
  if (page > 1) {
    page -= 1;
    history.push(`/new/${page}`);
  }
};
const nextPage = (match, history, feed) => () => {
  let page = getCurrentPage(match);
  if (page <= feed.count / LINKS_ON_PAGE) {
    console.log("NEW PA");
    page += 1;
    history.push(`/new/${page}`);
  }
};

export function LinkList({
  feedQuery: { loading, error, feed },
  location,
  match,
  history
}) {
  if (loading) return <h1>Loading</h1>;
  if (feed) {
    const newPage = isNewPage(location);
    const links = getLinksToRender(feed, newPage);
    const page = getCurrentPage(match);
    return (
      <div>
        <div>{links.map(renderLink)}</div>
        {newPage && (
          <div className="flex gray">
            <button onClick={previousPage(match, history)}>
              Previous Page
            </button>
            <button onClick={nextPage(match, history, feed)}>Next Page</button>
          </div>
        )}
      </div>
    );
  }
  if (error) {
    return <div>Something went wrong: {error}</div>;
  }
  return <h1>DEFAULT</h1>;
}

export const LINKS_ON_PAGE = 20;
const isNewPage = location =>
  location == !undefined ? location.pathname.includes("new") : "";
const getCurrentPage = match =>
  match !== undefined ? parseInt(match.params.page, 10) : 10;
export default graphql(GetLinks, {
  name: "feedQuery",
  options: ({ match, location }) => {
    const page = getCurrentPage(match);
    let skip = 0;
    let first = 100;
    let orderBy = null;
    if (isNewPage(location)) {
      skip = (page - 1) * LINKS_ON_PAGE;
      first = LINKS_ON_PAGE;
      orderBy = "createdAt_DESC";
    }
    return {
      variables: { first, skip, orderBy }
    };
  }
})(LinkListWithSub);
