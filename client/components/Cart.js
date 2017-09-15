import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import CartItem from './CartItem';
import { Container, Button, List } from 'semantic-ui-react';
import history from '../history';

const fakeCart = [
  {
    displayPrice: 12.34,
    id: 1,
    name: "Illinois",
    description: "great album much wow 5 stars",
    price: 1234,
    year: 1997,
    image: "http://www.chronicle.com/blogs/buildings/files/2011/09/Perdue-Hall.jpg",
    createdAt: "2017-09-14T15:52:35.079Z",
    updatedAt: "2017-09-14T15:52:35.079Z"
  },
  {
    displayPrice: 12.34,
    id: 2,
    name: "Florida",
    description: "great album much wow 5 stars",
    price: 1234,
    year: 1997,
    image: "https://www.e-architect.co.uk/images/jpgs/new_york/brooklyn_college_westquad_vinoly0107.jpg",
    createdAt: "2017-09-14T15:52:35.079Z",
    updatedAt: "2017-09-14T15:52:35.079Z"
  },
  {
    displayPrice: 12.34,
    id: 3,
    name: "California",
    description: "great album much wow 5 stars",
    price: 1234,
    year: 1997,
    image: "https://www.stchas.edu/images/buildings/ssb-bldg-940.jpg",
    createdAt: "2017-09-14T15:52:35.079Z",
    updatedAt: "2017-09-14T15:52:35.079Z"
  }
];

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
    // const { cart } = this.props;
    // console.log(cart);

    return (
      <Container style={this.styles.container}>
        <h2>Cart</h2>
        <List divided verticalAlign='middle'>
          {
            fakeCart.map(item => {
              return <CartItem key={item.id} item={item} />;
            })
          }
        </List>
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
