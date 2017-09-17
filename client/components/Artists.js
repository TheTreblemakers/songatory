import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { ArtistCard } from '../components';
import { Container, Divider, Card, Breadcrumb } from 'semantic-ui-react';

class Artists extends PureComponent {
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
    const currentPage = this.props.match.params.pageNumber;
    const artistsPerPage = 16;
    const start = (currentPage - 1) * artistsPerPage;
    const end = start + artistsPerPage;
    const pageArtists = artists.slice(start, end);
    const styles = this.styles;
    const numberOfPages = Math.ceil(artists.length / artistsPerPage);
    const pageList = new Array(numberOfPages);

    for (let i = 0; i < pageList.length; i++) pageList[i] = i + 1;

    return (
      <Container style={styles.container}>
        <h2>Our Artists</h2>
        <Breadcrumb size="small">
          {pageList.map((pageNumber) => {
            const pageUrl = `/artists/page/${pageNumber}`;
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
          {pageArtists &&
            pageArtists.map((artist) => {
              return <ArtistCard key={artist.id} artist={artist} />;
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
