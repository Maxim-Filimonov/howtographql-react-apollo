import React, { Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import Link from "./Link";
import { LinkListWithSub } from "./LinkList";

const SEARCH_QUERY = gql`
  query SearchQuery($filter: String!) {
    feed(filter: $filter) {
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

export class Search extends Component {
  state = {
    links: [],
    filter: "",
    loading: false
  };

  onSearchChange = e => this.setState({ filter: e.target.value });
  onSearchSubmit = async () => {
    this.setState({ loading: true });
    const { filter } = this.state;

    const result = await this.props.client.query({
      query: SEARCH_QUERY,
      variables: { filter }
    });
    const links = result.data.feed.links;
    this.setState({
      links,
      loading: false,
      subscribeToMore: result.subscribeToMore
    });
  };
  render() {
    if (this.state.loading) {
      return <h1>LOADING...</h1>;
    } else {
      return (
        <div>
          <div>
            Search
            <input type="text" onChange={this.onSearchChange} />
            <button onClick={this.onSearchSubmit}>Go!</button>
          </div>
          <LinkListWithSub
            links={this.state.links}
            subscribeToMore={this.state.subscribeToMore}
          />
        </div>
      );
    }
  }
}

export default withApollo(Search);
