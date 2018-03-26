import React from "react";
import { LinkListWithSub } from "./LinkList";
import { LINKS_ON_PAGE } from "./constants";
import { graphql } from "react-apollo";
import { GetLinks } from "./queries";

const getCurrentPage = match =>
  match !== undefined ? parseInt(match.params.page, 10) : 10;

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

export function PagedLinkList({
  feedQuery: { loading, error, feed, subscribeToMore },
  location,
  match,
  history
}) {
  if (loading) return <h1>Loading</h1>;
  if (feed) {
    const links = feed.links;
    const page = getCurrentPage(match);
    return (
      <div>
        <LinkListWithSub links={links} subscribeToMore={subscribeToMore} />
        <div className="flex gray">
          <button onClick={previousPage(match, history)}>Previous Page</button>
          <button onClick={nextPage(match, history, feed)}>Next Page</button>
        </div>
        )
      </div>
    );
  }
  if (error) {
    return <div>Something went wrong: {error}</div>;
  }
  return <h1>DEFAULT</h1>;
}

export default graphql(GetLinks, {
  name: "feedQuery",
  options: ({ match, location }) => {
    const page = getCurrentPage(match);
    const skip = (page - 1) * LINKS_ON_PAGE;
    const first = LINKS_ON_PAGE;
    const orderBy = "createdAt_DESC";
    return {
      variables: { first, skip, orderBy }
    };
  }
})(PagedLinkList);
