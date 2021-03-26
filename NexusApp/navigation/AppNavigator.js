import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStackNavigator, AuthStackNavigator} from './Navigators';
import {getToken, DeleteStorage} from '../helpers/TokenHelper';

class AppNavigator extends React.Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    // var tkn = await getToken();
  }

  render() {
    return (
      <NavigationContainer>
        <AuthStackNavigator />
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
