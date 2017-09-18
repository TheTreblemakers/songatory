import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { List, Image, Divider, Header, Container, Icon, Table, Breadcrumb, Button } from 'semantic-ui-react';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styles = {
      container: {
        padding: `2em`,
      },
    };
  }

  render() {
    const results = this.props.results;
    const queryType = this.props.queryType.charAt(0).toUpperCase() + this.props.queryType.slice(1);

    return (
      <Container style={this.styles.container}>
        {results.length > 0 ? <h2>{`Search Results in ${queryType}`}:</h2> : <h2>No results found.</h2>}
        <List size="huge" relaxed animated celled verticalAlign="middle">
          {results &&
            results.map((result) => {
              return (
                <List.Item key={result.id}>
                  {result.image && <Image avatar src={result.image} />}
                  <List.Content>
                    <List.Header as={Link} to={`/${queryType}/${result.id}`}>
                      {result.name}
                    </List.Header>
                  </List.Content>
                </List.Item>
              );
            })}
        </List>
      </Container>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    results: state.search.searchResults,
    queryType: state.search.queryType,
  };
};

export default withRouter(connect(mapState, null)(SearchResults));
