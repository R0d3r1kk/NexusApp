import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {primaryColor} from '../Settings';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddAccountScreen from '../screens/AddAccountScreen';
import {logout} from '../helpers/Authentication';
import AccountsScreen from '../screens/AccountsScreen';

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
      drawerContentOptions={{
        activeTintColor: primaryColor,
        itemStyle: {marginVertical: 5},
      }}>
      <Drawer.Screen name="Usuarios" component={HomeScreen} />
      <Drawer.Screen name="Agregar Usuario" component={RegisterScreen} />
      <Drawer.Screen name="Cuentas" component={AccountsScreen} />
      <Drawer.Screen name="Agregar Cuenta" component={AddAccountScreen} />
      {/* <Drawer.Screen name="Configuracion" component={SettingsScreen} /> */}
      <Drawer.Screen name="Configuración" component={DrawerLogOut} />
    </Drawer.Navigator>
  );
};

function DrawerLogOut(props) {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Cerrar Sessión" onPress={() => logout(navigation)} />
    </DrawerContentScrollView>
  );
}

export {AuthStackNavigator, MainStackNavigator};
