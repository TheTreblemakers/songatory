import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Container, Image, Button, Label, Item, Breadcrumb } from 'semantic-ui-react';
import history from '../history';

class Cart extends Component {
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
    //const {cart} = this.props;

    return (
      <Container style={this.styles.container}>
        <h2>Cart</h2>
        <Item.Group>
          <Item>
            <Item.Image size='small' src='http://s3.amazonaws.com/NRNArt/Michael-Buble--To-Be-Loved-album-cover.jpg'/>

            <Item.Content verticalAlign='middle'>
              <Item.Header>Album</Item.Header>
              <Item.Description></Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
        <Button floated='right'>
          Buy Order
        </Button>
      </Container>
    );
  }
}

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     cart: state.cart
//   };
// };

const mapDispatch = (dispatch) => { };

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(null, null)(Cart));

/**
 * PROP TYPES
 */
Cart.propTypes = {
  //cart: PropTypes.array.isRequired
};
