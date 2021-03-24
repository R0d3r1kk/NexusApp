import React from 'react';
import {View, Text} from 'react-native';

const screenStyle = {flex: 1, alignItems: 'center', justifyContent: 'center'};
const HomeScreen = ({navigation}) => {
  return (
    <View style={screenStyle}>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
