import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { feedQuery } from './LinkList';
import { LINKS_PER_PAGE } from '../constants';

const postMutation = gql(`
  mutation postMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
  `)
class CreateLink extends Component {
  state = {
    description: '',
    url: '',
  }

  render() {
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={this.state.url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button onClick={() => this._createLink()}>Submit</button>
      </div>
    )
  }

  _createLink = async () => {
    const { description, url } = this.state
    await this.props.postMutation({
      variables: {
        description,
        url,
      },
      update: (store, { data: { post } }) => {
        const first = LINKS_PER_PAGE;
        const skip = 0;
        const orderBy = 'createdAt_DESC';
        const data = store.readQuery({
          query: feedQuery,
          variables: { first, skip, orderBy },
        });
        data.feed.links.splice(0, 0, post);
        data.feed.links.pop();
        store.writeQuery({
          query: feedQuery,
          data,
          variables: { first, skip, orderBy },
        });
      },
    })
    this.props.history.push(`/feed/1`);
  }
}

export default graphql(postMutation, { name: "postMutation" })(CreateLink)
