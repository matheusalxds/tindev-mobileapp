import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client';

import api from '../utils/api';

import COLORS from '../variables/colors';
import BORDER from '../variables/border';
import SPACES from '../variables/spaces';
import FONT from '../variables/font';

import Logo from '../components/Logo';
import Like from '../components/Like';
import Dislike from '../components/Dislike';
import ItsAMatch from '../components/ItsAMatch';

function Main({ navigation }) {
  const id = navigation.getParam('user');
  const [data, setData] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: { user: id },
      });
      const { data } = response.data;
      return data;
    }

    loadUsers().then(resp => {
      setData(resp);
    });
  }, [id]);

  useEffect(() => {
    const socket = io('http://localhost:3050', { query: { user: id } });

    socket.on('match', dev => {
      setMatchDev(dev);
    });
  }, [id]);

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Login');
  }

  async function handleLike() {
    const [user, ...rest] = data;
    await api.post(`/devs/${user._id}/likes`, null, {
      headers: { user: id },
    });

    setData(rest);
  }

  async function handleDislike() {
    const [user, ...rest] = data;
    await api.post(`/devs/${user._id}/dislikes`, null, {
      headers: { user: id },
    });

    setData(rest);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Logo />
      </TouchableOpacity>
      <View style={styles.cardsContainer}>
        {data && data.length ? (
          data.map((item, index) => (
            <View
              style={[styles.card, { zIndex: data.length - 1 }]}
              key={item._id}
            >
              <Image
                style={styles.avatar}
                source={{
                  uri: item.avatar,
                }}
              />
              <View style={styles.footer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.bio} numberOfLines={3}>
                  {item.bio}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.empty}>Acabou :(</Text>
        )}
      </View>
      {data.length > 0 && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDislike}>
            <Dislike />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLike}>
            <Like />
          </TouchableOpacity>
        </View>
      )}

      {matchDev && (
        <View style={styles.matchContainer}>
          <ItsAMatch />
          <Image
            style={styles.matchAvatar}
            source={{
              uri: matchDev.avatar,
            }}
          />
          <Text style={styles.matchName}>{matchDev.name}</Text>
          <Text style={styles.matchBio}>{matchDev.bio}</Text>
          <TouchableOpacity onPress={() => setMatchDev(false)}>
            <Text style={styles.closeMatch}>Fechar</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.$defaultBgColor,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500,
  },

  avatar: {
    flex: 1,
    height: 300,
  },

  card: {
    borderWidth: 1,
    borderColor: COLORS.$defaultBgColor,
    borderRadius: BORDER.$borderRadius * 2,
    margin: SPACES.$spaceLg,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  footer: {
    backgroundColor: COLORS.$colorForeground,
    paddingHorizontal: SPACES.$spaceLg,
    paddingVertical: SPACES.$spaceMd,
  },

  name: {
    fontSize: FONT.$fontSize,
    fontWeight: 'bold',
    color: COLORS.$colorSuccess,
  },

  bio: {
    fontSize: FONT.$fontSize * 0.925,
    color: COLORS.$inputTextColor,
    marginTop: SPACES.$spaceXs,
    lineHeight: FONT.$lineHeight,
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: SPACES.$spaceLg,
  },

  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.$colorForeground,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    // android can only use elevation
    elevation: 100,
    // rest of elements can be applied for IOS
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  empty: {
    alignSelf: 'center',
    color: COLORS.$colorForeground,
    fontWeight: 'bold',
    fontSize: 20,
  },

  matchContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  matchAvatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: COLORS.$defaultBgColor,
    marginVertical: SPACES.$spaceLg,
  },

  matchName: {
    fontSize: FONT.$fontSize,
    fontWeight: 'bold',
    color: COLORS.$colorWhite,
  },

  matchBio: {
    marginTop: SPACES.$spaceXs,
    fontSize: FONT.$fontSize,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: SPACES.$spaceLg,
  },

  closeMatch: {
    fontSize: FONT.$fontSize,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: SPACES.$spaceXs,
    fontWeight: 'bold',
  }
});
