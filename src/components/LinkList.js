import React, { Component } from 'react';
import Link from './Link';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const feedQuery = gql(`
  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }`)

class LinkList extends Component {
  render() {
    if (this.props.feedQuery && this.props.feedQuery.loading)
      return <div>Loading</div>
    else if (this.props.feedQuery && this.props.feedQuery.error)
      return <div>{this.props.feedQuery.error}</div>
    else {
      const linksToRender = this.props.feedQuery.feed.links
      return (
        <div>
          {linksToRender.map(link => <Link key={link.id} link={link} />)}
        </div>
      )
    }
  }
}

export default graphql(feedQuery, { name: 'feedQuery' })(LinkList)
