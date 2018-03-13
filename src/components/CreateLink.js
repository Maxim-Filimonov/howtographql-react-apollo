import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const POST_MUTATION = gql`
  #2
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;
export class CreateLink extends Component {
  state = {
    description: "",
    url: ""
  };
  onDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };
  onUrlChange = e => {
    this.setState({ url: e.target.value });
  };
  createLink = async () => {
    const { description, url } = this.state;
    await this.props.postMutation({
      variables: {
        description,
        url
      }
    });
  };
  render() {
    const { description, url } = this.state;
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            type="text"
            placeholder="Description of the link"
            onChange={this.onDescriptionChange}
          />
          <input
            className="mb2"
            value={url}
            type="text"
            placeholder="The Url"
            onChange={this.onUrlChange}
          />
        </div>
        <button onClick={this.createLink}>Submit</button>
      </div>
    );
  }
}

export default graphql(POST_MUTATION, { name: "postMutation" })(CreateLink);
