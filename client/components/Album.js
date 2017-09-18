import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Segment, Table, Header, Image, Divider, Label, Button, Item, Container } from 'semantic-ui-react';
import { fetchAlbum } from '../store';

class Album extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        padding: `2em`,
      },
      title: {
        fontSize: `4em`,
      },
      subtitle: {
        fontSize: `2em`,
        padding: `0.2em`,
      },
    };
  }

  // <Button value={album.id} onClick={this.props.handleAddToCart}>Add To Cart</Button>

  componentDidMount() {
    this.props.getArtist(this.props.match.params.id);
  }

  render() {
    const styles = this.styles;
    const album = this.props.album;
    album.songs = album.songs
      ? album.songs.sort((song1, song2) => {
          return song1.trackNumber - song2.trackNumber;
        })
      : [];
    const categories = album.categories || [];
    const artist = album.artist || {};
    return (
      <Container style={styles.container}>
        <Item.Group>
          <Item>
            <Item.Image shape="rounded" bordered size="medium" src={album.image} />
            <Item.Content verticalAlign="middle">
              <Header style={styles.title} size="huge">
                {album.name}
              </Header>
              <div>
                <Header disabled size="huge">
                  {album.year}
                </Header>
              </div>
              <Divider /> by
              <Header as={Link} to={`/artists/${artist.id}`} style={styles.subtitle} sub>
                {artist.name}
              </Header>{' '}
              sounds like:
              <Segment>
                <Label.Group>
                  {categories.map((category) => {
                    return (
                      <Label as={Link} to={`/categories/${category.id}`} key={category.id}>
                        {category.name}
                      </Label>
                    );
                  })}
                </Label.Group>
              </Segment>
              <Item.Description>
                <Table striped>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Track</Table.HeaderCell>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Price</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {album.songs.map((song) => (
                      <Table.Row key={song.id}>
                        <Table.Cell> {song.trackNumber}</Table.Cell>
                        <Table.Cell> {song.name}</Table.Cell>
                        <Table.Cell>{song.price}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    album: state.albums.currentAlbum,
  };
};

const mapDispatch = (dispatch) => ({
  getArtist: (id) => {
    dispatch(fetchAlbum(id));
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Album);
