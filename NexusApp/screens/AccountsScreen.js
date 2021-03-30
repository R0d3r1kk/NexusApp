import React from 'react';
import {View, StyleSheet} from 'react-native';
import AccountList from '../components/AccountList';

const AccountsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <AccountList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default AccountsScreen;
