import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Container, Grid, Header } from 'semantic-ui-react';

const Landing = (props) => {
  const background = 'splash.jpg';
  const styles = {
    splash: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      background: `url(${background}) no-repeat center center fixed`,
      // background: `blue no-repeat center center fixed`,
      backgroundSize: 'cover',
      marginTop: '0',
    },
    dimmer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,.45)',
    },
    subtitle: {
      fontSize: '1em',
      fontWeight: 'normal',
    },
    title: {
      marginTop: '4em',
      fontSize: '4em',
      fontWeight: 'normal',
      fontFamily: 'Oleo Script',
    },
  };

  return (
    <Container style={styles.splash} fluid>
      <div style={styles.dimmer}>
        <Container text textAlign="center">
          <Header inverted style={styles.title}>
            songatory
          </Header>
        </Container>
      </div>
    </Container>
  );
};

export default Landing;
