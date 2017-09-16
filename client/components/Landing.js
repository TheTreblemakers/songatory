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

  return (
    <Splash>
      <Transition transitionOnMount={true} animation="fade up" duration={2000}>
        <Header inverted style={styles.title}>
          songatory
        </Header>
      </Transition>
    </Splash>
  );
};

export default Landing;
