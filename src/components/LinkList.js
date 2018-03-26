import React, { Component } from "react";
import { graphql } from "react-apollo";
import Link from "./Link";
import { GetLinks, SubscriptionNewLink, SubscriptionNewVote } from "./queries";

export class LinkListWithSub extends Component {
  subscribeToNewLinks() {
    this.props.subscribeToMore({
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
  }
  subscribeToNewVotes() {
    this.props.subscribeToMore({
      document: SubscriptionNewVote
    });
  }
  componentDidMount() {
    if (typeof this.props.subscribeToMore === "function") {
      this.subscribeToNewLinks();
      this.subscribeToNewVotes();
    }
  }

  renderLink(link, index) {
    return <Link key={link.id} link={link} index={index} />;
  }

  render() {
    const { links } = this.props;
    return (
      <div>
        <div>{links.map(this.renderLink)}</div>
      </div>
    );
  }
}
