import React from 'react';
import { StyleSheet, Image } from 'react-native';

import SPACES from '../variables/spaces';
import logo from '../assets/logo.png';

function Logo(props) {
  return <Image source={logo} style={styles.logo} />;
}

export default Logo;

const styles = StyleSheet.create({
  logo: {
    marginBottom: SPACES.$spaceSm,
  }
});
