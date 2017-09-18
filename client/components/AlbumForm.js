import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Segment, Table, Header, Divider, Label, Button, Item, Form } from 'semantic-ui-react';
import { fetchAlbum, changeAlbumDetails, submitAlbumUpdate } from '../store';

class AlbumForm extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        padding: `2em`,
      },
      title: {
        width: `100%`,
        marginBottom: `1em`,
      },
      subtitle: {
        fontSize: `2em`,
        padding: `0.2em`,
      },
    };
  }

  componentDidMount() {
    this.props.getAlbum(this.props.match.params.id);
  }

  render() {
    const styles = this.styles;
    const { album, handleChange } = this.props;
    album.songs = album.songs
      ? album.songs.sort((song1, song2) => {
          return song1.trackNumber - song2.trackNumber;
        })
      : [];
    const categories = album.categories || [];
    const artist = album.artist || {};
    return (
      <Form style={styles.container} onChange={handleChange}>
        <Item.Group>
          <Item>
            <Item.Image shape="rounded" bordered size="medium" src={album.image} />
            <Item.Content verticalAlign="middle">
              <Header style={styles.title} size="huge">
                <Form.Field>
                  <label>Name:</label>
                  <input name="name" value={album.name} />
                </Form.Field>
              </Header>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Image Url:</label>
                  <input name="image" value={album.image} />
                </Form.Field>
                <Form.Field>
                  <label>Year:</label>
                  <input name="year" value={album.year} />
                </Form.Field>
                <Form.Field>
                  <label>Price:</label>
                  <input disabled name="price" value={album.displayPrice} />
                </Form.Field>
              </Form.Group>
                <Form.Field>
                  <label>Description:</label>
                  <input name="description" value={album.description} />
                </Form.Field>
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
      </Form>
    );
  }
}

const mapEdit = (state) => {
  return {
    name: 'edit',
    displayName: 'Edit Album',
    album: state.albums.currentAlbum,
  };
};

const mapDispatch = (dispatch) => ({
  getAlbum: (id) => {
    dispatch(fetchAlbum(id));
  },

  handleChange(evt) {
    dispatch(changeAlbumDetails(evt.target.name, evt.target.value));
  },

  handleSubmit (evt) {
    evt.preventDefault();
    console.log(this.props);
    if (this.props.name === 'edit') {
      dispatch(submitAlbumUpdate(this.props.album));
    }
  }
});

export const EditAlbum = connect(mapEdit, mapDispatch)(AlbumForm);
