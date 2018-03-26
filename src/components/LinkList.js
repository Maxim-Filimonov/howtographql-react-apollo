import React, { Component } from "react";
import { graphql } from "react-apollo";
import Link from "./Link";
import { GetLinks, SubscriptionNewLink, SubscriptionNewVote } from "./queries";

const subscribeToNewVotes = props => {
  props.subscribeToMore({
    document: SubscriptionNewVote
  });
};

const subscribeToNewLinks = props => {
  props.subscribeToMore({
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
    const { links } = this.props;
    return (
      <div>
        <div>{links.map(renderLink)}</div>
      </div>
    );
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
