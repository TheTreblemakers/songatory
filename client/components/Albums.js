import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { AlbumCard } from '../components';
import { Container, Divider, Card, Breadcrumb } from 'semantic-ui-react';

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styles = {
      container: {
        padding: `2em`,
      },
      card: {},
    };
  }

  render() {
    const { albums } = this.props;
    const styles = this.styles;
    return (
      <Container style={styles.container}>
        <h2>All Albums</h2>
        <Card.Group itemsPerRow={4}>
          {albums.map((album, idx) => {
            if (idx > 16) return;
            return <AlbumCard key={album.id} album={album} />;
          })}
        </Card.Group>
        <Divider />
        <Breadcrumb size="small">
          <Breadcrumb.Section active>1</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section link>2</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
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
    albums: state.albums,
  };
};

const mapDispatch = (dispatch) => {};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, null)(Albums));
