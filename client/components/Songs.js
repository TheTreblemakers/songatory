import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Breadcrumb } from 'semantic-ui-react';
import history from '../history';

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>All Songs</h2>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Artist</Table.HeaderCell>
              <Table.HeaderCell>Album</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell> Don't Let Me Down</Table.Cell>
              <Table.Cell> The Beatles</Table.Cell>
              <Table.Cell>Imagine: John Lennon</Table.Cell>
              <Table.Cell>$0.99</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> Don't Let Me Down</Table.Cell>
              <Table.Cell> The Beatles</Table.Cell>
              <Table.Cell>Imagine: John Lennon</Table.Cell>
              <Table.Cell>$0.99</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> Don't Let Me Down</Table.Cell>
              <Table.Cell> The Beatles</Table.Cell>
              <Table.Cell>Imagine: John Lennon</Table.Cell>
              <Table.Cell>$0.99</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell> Don't Let Me Down</Table.Cell>
              <Table.Cell> The Beatles</Table.Cell>
              <Table.Cell>Imagine: John Lennon</Table.Cell>
              <Table.Cell>$0.99</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Breadcrumb>
          <Breadcrumb.Section active>1</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section link>2</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section link>3</Breadcrumb.Section>
        </Breadcrumb>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {};

const mapDispatch = (dispatch) => {};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Songs));
