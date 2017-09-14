import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Container, Grid, Image, Button, Label, Breadcrumb } from 'semantic-ui-react';
import history from '../history';

class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styles = {
      container: {
        padding: `2em`,
      },
    };
  }

  render() {
    return (
      <Container style={this.styles.container}>
        <h2>All Artists</h2>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
              <Button>
                <Image src="http://s3.amazonaws.com/NRNArt/Michael-Buble--To-Be-Loved-album-cover.jpg" />
                <Label>Artist 1</Label>
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button>
                <Image src="http://s3.amazonaws.com/NRNArt/Michael-Buble--To-Be-Loved-album-cover.jpg" />
                <Label>Artist 2</Label>
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button>
                <Image src="http://s3.amazonaws.com/NRNArt/Michael-Buble--To-Be-Loved-album-cover.jpg" />
                <Label>Artist 3</Label>
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button>
                <Image src="http://s3.amazonaws.com/NRNArt/Michael-Buble--To-Be-Loved-album-cover.jpg" />
                <Label>Artist 1</Label>
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button>
                <Image src="http://s3.amazonaws.com/NRNArt/Michael-Buble--To-Be-Loved-album-cover.jpg" />
                <Label>Artist 2</Label>
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button>
                <Image src="http://s3.amazonaws.com/NRNArt/Michael-Buble--To-Be-Loved-album-cover.jpg" />
                <Label>Artist 3</Label>
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button>
                <Image src="http://s3.amazonaws.com/NRNArt/Michael-Buble--To-Be-Loved-album-cover.jpg" />
                <Label>Artist 1</Label>
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button>
                <Image src="http://s3.amazonaws.com/NRNArt/Michael-Buble--To-Be-Loved-album-cover.jpg" />
                <Label>Artist 2</Label>
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button>
                <Image src="http://s3.amazonaws.com/NRNArt/Michael-Buble--To-Be-Loved-album-cover.jpg" />
                <Label>Artist 3</Label>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Breadcrumb size="small">
          <Breadcrumb.Section active>1</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section link>2</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section link>3</Breadcrumb.Section>
        </Breadcrumb>
      </Container>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {};

const mapDispatch = (dispatch) => {};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, null)(Artists));
