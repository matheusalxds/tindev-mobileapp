import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import COLORS from '../variables/colors';
import SPACES from '../variables/spaces';
import BORDER from '../variables/border';
import FONT from '../variables/font';

import Logo from '../components/Logo';

import api from '../utils/api';

function Login({ navigation }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Main', { user });
      }
    });
  }, []);

  async function handleLogin() {
    const response = await api.post('/devs', { username: user });
    const { _id } = response.data.data;
    await AsyncStorage.setItem('user', _id);
    navigation.navigate('Main', { user: _id });
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <Logo />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        placeholder="Digite seu usuário do GitHub"
        value={user}
        onChangeText={setUser}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.$defaultBgColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACES.$spaceLg,
  },

  input: {
    alignSelf: 'stretch',
    backgroundColor: COLORS.$colorForeground,
    borderRadius: BORDER.$borderRadius,
    height: 48,
    paddingHorizontal: SPACES.$spaceMd,
    color: COLORS.$textColor,
  },

  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: COLORS.$colorDanger,
    borderRadius: BORDER.$borderRadius,
    marginTop: SPACES.$spaceMd,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: COLORS.$colorForeground,
    fontSize: FONT.$fontSize,
    fontWeight: 'bold',
  },
});
