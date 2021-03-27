import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStackNavigator} from './Navigators';

class AppNavigator extends React.Component {
  constructor() {
    super();
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
