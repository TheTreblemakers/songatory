import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Search } from 'semantic-ui-react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: '',
    };
    this.styles = {
      search: {
        width: `400px`,
      },
    };
  }

  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: '' });
  };

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) {
        return this.resetComponent();
      }

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => {
        return re.test(result.title);
      };

      this.setState({
        isLoading: false,
        results: _.filter(this.props.artists, isMatch),
      });
    }, 0);
  };

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Search
        fluid
        input={{ fluid: true }}
        style={this.styles.search}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
      />
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    artists: state.artists,
    albums: state.albums,
  };
};

const mapDispatch = (dispatch) => {};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, null)(SearchBar));
