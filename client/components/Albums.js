import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Container, Image, Button, Label, Item, Breadcrumb } from 'semantic-ui-react';
import Album from  './Album';
import history from '../history';

class Albums extends Component {
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
    const {albums} = this.props;

    return (
      <Container style={this.styles.container}>
        <h2>All Albums</h2>
          <Item.Group>
            <Album albums={albums} />
          </Item.Group>

         <Breadcrumb size='small'>
          <Breadcrumb.Section active>1</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right chevron' />
          <Breadcrumb.Section link>2</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right chevron' />
          <Breadcrumb.Section link>3</Breadcrumb.Section>
        </Breadcrumb>
      </Container>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    albums: state.albums
  }
};

const mapDispatch = (dispatch) => {};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, null)(Albums));

/**
 * PROP TYPES
 */
Albums.propTypes = {
  albums: PropTypes.array.isRequired
};
