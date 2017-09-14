import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';

const Landing = (props) => {
  const background = 'splash.jpg';
  const styles = {
    splash: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      background: `url(${background}) no-repeat center center fixed`,
      backgroundSize: 'cover',
      marginTop: 0,
      boxShadow: '0 0 0 1000px rgba(0,0,0,0.45) inset',
    },
    subtitle: {
      fontSize: '1em',
      fontWeight: 'normal',
    },
    title: {
      marginTop: '7em',
      fontSize: '4em',
      fontWeight: 'normal',
      fontFamily: 'Oleo Script',
      textAlign: 'center',
    },
  };

  return (
    <Container style={styles.splash} fluid>
      <Header inverted style={styles.title}>
        songatory
      </Header>
    </Container>
  );
};

export default Landing;
