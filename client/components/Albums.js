import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { AlbumCard } from '../components';
import { addAlbumToCart } from '../store';
import history from '../history';
import { Container, Divider, Card, Breadcrumb, Button } from 'semantic-ui-react';

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
            if (idx > 15) return;
            return (<div key={album.id}>
              <AlbumCard album={album} />
              <Button value={album.id} onClick={this.props.handleAddToCart}>Add To Cart</Button>
            </div>);
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
    albums: state.albums.allAlbums,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleAddToCart (e) {
      const albumId = +e.target.value;
      dispatch(addAlbumToCart({id: albumId}));
      history.push('/cart');
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Albums));

/**
 * PROP TYPES
 */
Albums.propTypes = {
  albums: PropTypes.array.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};
