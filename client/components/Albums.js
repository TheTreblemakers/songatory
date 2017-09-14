import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Image, Button, Label, Item, Breadcrumb } from 'semantic-ui-react';
import history from '../history';

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {albums} = this.props;

    return (
      <div>
        <h2>All Albums</h2>
          <Item.Group>
            {
              albums.map(album => {
                return <Item key={album.id}>
                  <Item.Image size='medium' src={album.image} />

                  <Item.Content>
                    <Item.Header>{album.name}</Item.Header>
                    <Item.Meta>
                      <span className='price'>{album.displayPrice}</span>
                    </Item.Meta>
                    <Item.Description>{album.description}</Item.Description>
                    <Button primary>Purchase Album</Button>
                  </Item.Content>
                </Item>
              })
            }
          </Item.Group>

         <Breadcrumb size='small'>
          <Breadcrumb.Section active>1</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right chevron' />
          <Breadcrumb.Section link>2</Breadcrumb.Section>
          <Breadcrumb.Divider icon='right chevron' />
          <Breadcrumb.Section link>3</Breadcrumb.Section>
        </Breadcrumb>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    albums: state.albums
  }
};

const mapDispatch = (dispatch) => {};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, null)(Albums));

/**
 * PROP TYPES
 */
Albums.propTypes = {
  albums: PropTypes.array.isRequired
};

{/*
  <Grid columns={3} divided>
          <Grid.Row>
            {
              albums.map(album => {
                return <Grid.Column key = {album.id}>
                  <Button>
                    <Image src= {album.image} />
                    <Label>
                      {album.name}
                    </Label>
                  </Button>
                   <Label>
                      {album.displayPrice}
                    </Label>
                </Grid.Column>
              })
            }
        </Grid.Row>
  </Grid>
*/}
