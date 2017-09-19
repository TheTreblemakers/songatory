import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Splash } from '../components';
import { Button, Header, Transition } from 'semantic-ui-react';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.styles = {
      title: {
        fontSize: '8em',
        fontWeight: 'normal',
        fontFamily: 'Oleo Script',
        letterSpacing: '0.02em',
      },
    };
  }

  componentDidMount() {
    requestAnimationFrame(() => this.setState({ visible: true }));
  }

  render() {
    const visible = this.state.visible;
    let child = (
      <Header inverted style={this.styles.title}>
        songatory
      </Header>
    );
    return (
      <Splash>
        <Transition visible={visible} animation="fade up" duration={2000}>
          {child}
        </Transition>
      </Splash>
    );
  }
}

export default Landing;
