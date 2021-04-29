import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Userlist from '../components/Userlist';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = ({props}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const {nav} = props;
  useEffect(() => {
    let isActive = true;
    if (isActive) {
      if (nav) {
        var data = nav.navigation.getParam('userdata', null);
        if (data) {
          setUser(data);
        } else {
          isActive = false;
        }
      }
    }
    return () => {
      isActive = false;
    };
  }, [nav]);


  return (
    <View style={styles.container}>
      <Userlist user={user} navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default HomeScreen;
