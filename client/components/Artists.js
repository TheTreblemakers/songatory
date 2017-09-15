import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Container, Image, Card, Icon, Breadcrumb } from 'semantic-ui-react';

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
    const imgUrl = 'http://via.placeholder.com/300x300';
    return (
      <Container style={styles.container}>
        <h2>All Artists</h2>
        <Card.Group itemsPerRow={4}>
          {artists.map((artist, idx) => {
            if (idx > 16) return;
            const artistUrl = `/artist/${artist.id}`;
            return (
              <Card key={artist.id} raised>
                <Image src={imgUrl} as={Link} to={artistUrl} />
                <Card.Content>
                  <Card.Header>{artist.name}</Card.Header>
                  <Card.Meta>Artist Blurb Goes Here</Card.Meta>
                  <Card.Description>{artist.bio.split('.')[0]}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Icon name="right chevron" />
                  <Link to={artistUrl}>See More</Link>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
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
    artists: state.artists,
  };
};

const mapDispatch = (dispatch) => {};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, null)(Artists));
