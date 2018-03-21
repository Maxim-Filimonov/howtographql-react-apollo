import React from "react";
import { isLoggedIn } from "./loginService";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const VOTE_MUTATION = gql`
  mutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

function timeDifference(current, previous) {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return "just now";
  }

  if (elapsed < milliSecondsPerMinute) {
    return "less than 1 min ago";
  } else if (elapsed < milliSecondsPerHour) {
    return Math.round(elapsed / milliSecondsPerMinute) + " min ago";
  } else if (elapsed < milliSecondsPerDay) {
    return Math.round(elapsed / milliSecondsPerHour) + " h ago";
  } else if (elapsed < milliSecondsPerMonth) {
    return Math.round(elapsed / milliSecondsPerDay) + " days ago";
  } else if (elapsed < milliSecondsPerYear) {
    return Math.round(elapsed / milliSecondsPerMonth) + " mo ago";
  } else {
    return Math.round(elapsed / milliSecondsPerYear) + " years ago";
  }
}

const voteForLink = (vote, linkId) => async () => {
  await vote({
    variables: {
      linkId
    }
  });
};

export function Link({
  link: { id, description, url, votes, postedBy },
  index,
  updateStoreAfterVote,
  vote
}) {
  return (
    <div className="flex">
      <span className="gray mr1">{index + 1}</span>
      {isLoggedIn() && (
        <div
          className="mr1 gray f11"
          onClick={voteForLink(vote, id, updateStoreAfterVote)}
        >
          ^^^
        </div>
      )}
      <div className="flex items-center">
        {description} ({url})
      </div>
      <div className="ml1 gray">
        {votes ? votes.length : 0} votes
        <span className="red ml1">
          by {postedBy ? postedBy.name : "Unknown"}
        </span>
      </div>
    </div>
  );
}
export default graphql(VOTE_MUTATION, { name: "vote" })(Link);
