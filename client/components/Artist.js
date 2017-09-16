import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Button, Item, Container } from 'semantic-ui-react';

class Artist extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        padding: `2em`,
      },
    };
  }

  render() {
    const styles = this.styles;
    return (
      <Container style={styles.container}>
        <div>Artist {this.props.match.params.id}</div>
      </Container>
    );
  }
}

export default Artist;
