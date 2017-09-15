import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Container, Icon, Item, Button, Label, Breadcrumb } from 'semantic-ui-react';

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
    console.log(this.props);
    const { artists } = this.props;
    const imgUrl = `http://via.placeholder.com/150x150`;
    return (
      <Container style={this.styles.container}>
        <h2>All Artists</h2>
        <Item.Group divided>
          {artists.map((artist, index) => {
            if (index > 10) return;
            return (
              <Item key={artist.id}>
                <Item.Image src={imgUrl} />
                <Item.Content>
                  <Item.Header as="a">{artist.name}</Item.Header>
                  <Item.Description>{artist.bio}</Item.Description>
                  <Item.Extra>
                    <Button primary floated="right">
                      Details
                      <Icon name="right chevron" />
                    </Button>
                    <Label>category#001</Label>
                    <Label>category#002</Label>
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
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
const mapState = (state) => {
  return {
    artists: state.artists,
  };
};

const mapDispatch = (dispatch) => {};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, null)(Artists));
