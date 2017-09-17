import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Divider, Container, Icon, Table, Breadcrumb, Button } from 'semantic-ui-react';
import history from '../history';
import { fetchSongs } from '../store/songs';

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

  componentDidMount() {}

  render() {
    return (
      <Container style={this.styles.container}>
        <h2>All Search Results</h2>
        <Divider />

        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Artist</Table.HeaderCell>
              <Table.HeaderCell>Album</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

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
    // songs: state.songs,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(SearchResults));

/**
 * PROP TYPES
 */
SearchResults.propTypes = {
  songs: PropTypes.array,
};
