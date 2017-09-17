import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Header, Image, Divider, Label, Button, Item, Container } from 'semantic-ui-react';
import { fetchCategory } from '../store';

class Category extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        padding: `2em`,
      },
    };
  }

  componentDidMount() {
    this.props.getCategory(this.props.match.params.id);
  }

  render() {
    const styles = this.styles;
    const category = this.props.category;
    const albums = category.albums || [];
    return (
      <Container style={styles.container}>
        <Header style={styles.title}>{category.name}</Header>
        <Divider />
        <Item.Group>
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
                  <Item.Header as="a">{album.name}</Item.Header>
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
    category: state.categories.currentCategory,
  };
};

const mapDispatch = (dispatch) => ({
  getCategory: (id) => {
    dispatch(fetchCategory(id));
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Category);
