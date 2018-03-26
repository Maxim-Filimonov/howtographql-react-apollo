import gql from "graphql-tag";
const linkQuery = `id
          url
          description
          createdAt
          postedBy {
            id
            name
          }
          votes {
            id
            user {
              id
            }
          }`;

export const GetLinks = gql`
  query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
      count
      links {
        ${linkQuery}
      }
    }
  }
`;

export const SubscriptionNewVote = gql`
  subscription {
    newVote {
      node {
        id
        link {
          ${linkQuery}
        }
        user {
          id
        }
      }
    }
  }
`;
export const SubscriptionNewLink = gql`
  subscription {
    newLink {
      node {
        ${linkQuery}
      }
    }
  }
`;
