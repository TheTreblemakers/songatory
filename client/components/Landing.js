import React from 'react';
import PropTypes from 'prop-types';
import { Splash } from '../components';
import { Header, Transition } from 'semantic-ui-react';

const Landing = (props) => {
  const styles = {
    title: {
      fontSize: '4em',
      fontWeight: 'normal',
      fontFamily: 'Oleo Script',
    },
  };

  const drawTitle = () => {
    return (
      <Header inverted style={styles.title}>
        songatory
      </Header>
    );
  };

  return (
    <Splash>
      <Transition.Group as={Header} animation="fade up" duration={2000}>
        {drawTitle()}
      </Transition.Group>
    </Splash>
  );
};

export default Landing;
