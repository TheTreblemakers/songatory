import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Header, Image, Divider, Label, Button, Item, Container } from 'semantic-ui-react';
import { fetchArtist } from '../store';

class Artist extends Component {
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
    const artist = this.props.artist;
    const albums = artist.albums || [];
    return (
      <Container style={styles.container}>
        <Image shape="circular" bordered size="medium" src={artist.image} />
        <Header size="large">{artist.name}</Header>
        <Divider />
        <Item.Group>
          {albums.map((album) => {
            console.log(album.songs);
            return (
              <Item key={album.id}>
                <Item.Image src={album.image} />
                <Item.Content>
                  <Item.Header as="a">{album.name}</Item.Header>
                  <Item.Meta>
                    <span className="cinema">{album.description}</span>
                  </Item.Meta>
                  <Item.Description>
                    <Table striped>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Name</Table.HeaderCell>
                          <Table.HeaderCell>Price</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {album.songs.map((song) => (
                          <Table.Row key={song.id}>
                            <Table.Cell> {song.name}</Table.Cell>
                            <Table.Cell>{song.price}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Item.Description>
                  <Item.Extra>
                    <Label>category1</Label>
                    <Label>category2</Label>
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    artist: state.artists.currentArtist,
  };
};

const mapDispatch = (dispatch) => ({
  getArtist: (id) => {
    dispatch(fetchArtist(id));
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Artist);
