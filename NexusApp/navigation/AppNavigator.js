import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStackNavigator, AuthStackNavigator} from './Navigators';

const AppNavigator = () => {
  const [isSignedIn] = useState(false);

  if (!isSignedIn) {
    return (
      <NavigationContainer>
        <AuthStackNavigator />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
