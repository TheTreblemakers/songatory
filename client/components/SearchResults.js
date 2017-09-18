import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Divider, Header, Container, Icon, Table, Breadcrumb, Button } from 'semantic-ui-react';

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
        <h2>{`Search Results in ${queryType}`}:</h2>
        <Divider />
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {results &&
            results.map((result) => {
              return (
                <Table.Row key={result.id}>
                  <Table.Cell>
                    <Header as={Link} to={`/${queryType}/${result.id}`}>
                      {result.name}
                    </Header>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          <Table.Body />
        </Table>
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
