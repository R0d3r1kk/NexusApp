import React from 'react';
import {View, StyleSheet} from 'react-native';
import Userlist from '../components/Userlist';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Userlist />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default HomeScreen;
