import React from 'react';
import PropTypes from 'prop-types';
import { Splash } from '../components';
import { Header } from 'semantic-ui-react';

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
      <Header inverted style={styles.title}>
        songatory
      </Header>
    </Splash>
  );
};

export default Landing;
