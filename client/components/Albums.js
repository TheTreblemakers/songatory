import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Image, Button, Label, Breadcrumb } from 'semantic-ui-react';
import history from '../history';

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {albums} = this.props;
    console.log('albums', albums);
    return (
      <div>
        <h2>All Albums</h2>
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
