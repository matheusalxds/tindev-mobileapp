import React from 'react';
import { StyleSheet, Image } from 'react-native';

import SPACES from '../variables/spaces';
import itsAMath from '../assets/itsamatch.png';

function ItsAMath(props) {
  return <Image source={itsAMath} style={styles.itsAMath} />;
}

export default ItsAMath;

const styles = StyleSheet.create({
  itsAMath: {
    marginTop: SPACES.$spaceSm,
    marginBottom: SPACES.$spaceSm,
    height: 60,
    resizeMode: 'contain',
  },
});
