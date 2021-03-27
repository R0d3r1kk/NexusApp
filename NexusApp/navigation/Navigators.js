import React from 'react';
import {TouchableOpacity, FontAwesome5} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {primaryColor} from '../Settings';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: primaryColor,
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={DrawerStackNavigator} />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="home" component={DrawerStackNavigator} />
      <Stack.Screen name="main" component={HomeScreen} />
      <Stack.Screen name="settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

const DrawerStackNavigator = () => {
  return (
    <Drawer.Navigator
      hideStatusBar="false"
      drawerContentOptions={{
        activeTintColor: primaryColor,
        itemStyle: {marginVertical: 5},
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Agregar " component={RegisterScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export {AuthStackNavigator, MainStackNavigator};
