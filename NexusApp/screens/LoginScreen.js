import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Form from '../components/Form';
import {login} from '../helpers/Authentication';
import {validateContent, validateLength} from '../components/Validations';
import jwt_decode from 'jwt-decode';
import {setToken} from '../helpers/TokenHelper';

const LoginScreen = ({props}) => {
  const navigation = useNavigation();
  const {nav} = props;
  useEffect(() => {
    let isActive = true;
    if (isActive) {
      if (nav) {
        var data = nav.getParam('error', null);
        if (data) {
          if (data.error) {
            Alert.alert('Upss', data.error);
          }
        } else {
          isActive = false;
        }
      }
    }
    return () => {
      isActive = false;
    };
  }, [nav]);

  const handleResult = result => {
    try {
      setToken(result);
      var userToken = jwt_decode(result);
      navigation.replace('Home', {
        userdata: userToken,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form
      navigation={navigation}
      title="Acceso!!"
      action={login}
      afterSubmit={handleResult}
      buttonText="Log In"
      fields={{
        email: {
          label: 'Email',
          input: {
            type: 'text',
          },
          validators: [validateContent],
          inputProps: {
            keyboardType: 'email-address',
          },
        },
        password: {
          label: 'Password',
          input: {
            type: 'text',
          },
          validators: [validateContent, validateLength],
          inputProps: {
            secureTextEntry: true,
          },
        },
      }}
    />
  );
};

export default LoginScreen;
