import React, { Component } from 'react'
import { timeDifferenceForDate } from '../utils'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const upvote = gql(`
  mutation upvote($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
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
`);

class Link extends Component {
  render() {
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}.</span>
          <div className="ml1 gray f11" onClick={() => this._voteForLink()}>
            ▲
          </div>
        </div>
        <div className="ml1">
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
          <div className="f6 lh-copy gray">
            {this.props.link.votes.length} votes | by{' '}
            {this.props.link.postedBy
              ? this.props.link.postedBy.name
              : 'Unknown'}{' '}
            {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </div>
      </div>
    )
  }

  _voteForLink = async () => {
    var linkId = this.props.link.id;
    try {
      await this.props.upvote({
        variables: {
          linkId
        },
        update: (store, { data: { vote } }) => {
          this.props.updateStoreAfterVote(store, vote, linkId);
        }
      });
    } catch (error) {
      if (error.hasOwnProperty("graphQLErrors")) {
        console.error(error.message);
      }
      else {
        console.error(error);        
      }
    }
  }
}

export default graphql(upvote, { name: "upvote" })(Link);
