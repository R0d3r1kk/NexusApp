import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';

import AccountsScreen from '../screens/AccountsScreen';
import AddAccountScreen from '../screens/AddAccountScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import React from 'react';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SplashScreen from '../screens/SplashScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {logout} from '../helpers/Authentication';
import {primaryColor} from '../Settings';
import {useNavigation} from '@react-navigation/native';

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
      <Stack.Screen name="Login">
        {props => <LoginScreen props={props} />}
      </Stack.Screen>
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
      <Drawer.Screen name="Usuarios">
        {props => <HomeScreen props={props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Agregar Usuario">
        {props => <RegisterScreen props={props} />}
      </Drawer.Screen>
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
