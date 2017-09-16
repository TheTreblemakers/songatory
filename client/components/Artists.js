import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { ArtistCard } from '../components';
import { Container, Divider, Card, Breadcrumb } from 'semantic-ui-react';

class Artists extends Component {
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
    const { artists } = this.props;
    const styles = this.styles;

    return (
      <Container style={styles.container}>
        <h2>All Artists</h2>
        <Card.Group itemsPerRow={4}>
          {artists.map((artist, idx) => {
            if (idx > 15) return;
            return <ArtistCard key={artist.id} artist={artist} />;
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
    artists: state.artists.allArtists,
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState)(Artists));

/**
 * PROP TYPES
 */
Artists.propTypes = {
  artists: PropTypes.array.isRequired,
};

