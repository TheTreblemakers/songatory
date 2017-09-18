import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Segment, Grid, Header, Image, Divider, Label, Button, Item, Container } from 'semantic-ui-react';
import { fetchArtist } from '../store';

class Artist extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        padding: `2em`,
      },
      title: {
        fontSize: `6em`,
        fontWeight: 'bold',
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
    const categories = albums
      ? albums.reduce((acc, album) => {
          let c = album.categories.map((category) => {
            return category;
          });
          return acc.concat(c);
        }, [])
      : [];

    return (
      <Container style={styles.container}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image shape="circular" bordered size="medium" src={artist.image} />
            </Grid.Column>
            <Grid.Column width={12} verticalAlign="middle">
              <Header style={styles.title} size="large">
                {artist.name}
              </Header>
              <Segment>
                <Label.Group>
                  {categories.map((category) => {
                    return (
                      <Label as={Link} to={`/categories/${category.id}`} key={category.name}>
                        {category.name}
                      </Label>
                    );
                  })}
                </Label.Group>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider />
        <Item.Group divided>
          {albums.map((album) => {
            album.songs = album.songs
              ? album.songs.sort((song1, song2) => {
                  return song1.trackNumber - song2.trackNumber;
                })
              : [];
            return (
              <Item key={album.id}>
                <Item.Image as={Link} to={`/albums/${album.id}`} shape="rounded" src={album.image} />
                <Item.Content>
                  <Item.Header as={Link} to={`/albums/${album.id}`}>
                    {album.name}
                  </Item.Header>
                  <Item.Meta>
                    <span className="cinema">{album.description}</span>
                  </Item.Meta>
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
