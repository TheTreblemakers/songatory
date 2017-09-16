// View of all Categorys and Albums in this Category
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
    return <Container style={styles.container}>Category</Container>;
  }
}

const mapState = (state) => {
  return {
    category: state.categorys.currentCategory,
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
