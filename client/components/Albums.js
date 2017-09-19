import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { AlbumCard } from '../components';
import { addAlbumToUserCart } from '../store';
import history from '../history';
import { Container, Button, Divider, Card, Breadcrumb } from 'semantic-ui-react';

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
    const currentPage = this.props.match.params.pageNumber;
    const albumsPerPage = 16;
    const start = (currentPage - 1) * albumsPerPage;
    const end = start + albumsPerPage;
    const pageAlbums = albums.slice(start, end);
    const styles = this.styles;
    const numberOfPages = Math.ceil(albums.length / albumsPerPage);
    const pageList = new Array(numberOfPages);

    for (let i = 0; i < pageList.length; i++) pageList[i] = i + 1;

    return (
      <Container style={styles.container}>
        <h2>All Albums</h2>
        <Breadcrumb size="small">
          {pageList.map((pageNumber) => {
            const pageUrl = `/albums/page/${pageNumber}`;
            if (pageNumber === numberOfPages) {
              return (
                <Breadcrumb.Section link key={pageNumber} as={Link} to={pageUrl} active={currentPage === pageNumber}>
                  {pageNumber}
                </Breadcrumb.Section>
              );
            }
            return (
              <span key={pageNumber}>
                <Breadcrumb.Section link as={Link} to={pageUrl} active={currentPage === pageNumber}>
                  {pageNumber}
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right angle" />
              </span>
            );
          })}
        </Breadcrumb>
        <Divider />
        <Card.Group itemsPerRow={4}>
          {pageAlbums.map((album) => {
            return <AlbumCard key={album.id} album={album} />;
          })}
        </Card.Group>
        <Divider />
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
    handleAddToUserCart(e) {
      const albumId = +e.target.value;
      dispatch(addAlbumToUserCart({ id: albumId }));
    },
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
  handleAddToUserCart: PropTypes.func.isRequired,
};
