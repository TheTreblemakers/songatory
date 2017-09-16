import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Header, Image, Divider, Label, Button, Item, Container } from 'semantic-ui-react';
import { fetchAlbum } from '../store';

class Album extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        padding: `2em`,
      },
    };
  }

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
    console.log('album', album);
    return (
      <Container style={styles.container}>
        <Item.Group>
          <Item>
            <Item.Image shape="rounded" bordered size="medium" src={album.image} />
            <Item.Content>
              <Header size="huge">{album.name}</Header>
              <Divider />
              by <Header sub>{artist.name}</Header>
              <Divider />
              {categories.map((category) => {
                return <Label key={category.id}>{category.name}</Label>;
              })}
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
