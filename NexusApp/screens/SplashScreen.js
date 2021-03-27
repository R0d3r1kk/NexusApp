import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {checkToken, DeleteStorage} from '../helpers/TokenHelper';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 300,
    height: 50,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

const SplashScreen = ({navigation}) => {
  setTimeout(async function () {
    //await DeleteStorage();
    if (await checkToken(navigation)) {
      navigation.replace('Home');
    }
  }, 5000);

  return (
    <View style={styles.view}>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/images/logo.png')}
      />
      <Text style={styles.text}>NEARSHORE SOFTWARE DEVELOPMENT</Text>
    </View>
  );
};

export default SplashScreen;
