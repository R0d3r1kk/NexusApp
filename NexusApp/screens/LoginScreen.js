import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Form from '../components/Form';
import {login} from '../helpers/Authentication';
import {validateContent, validateLength} from '../components/Validations';
import jwt_decode from 'jwt-decode';
import {setToken} from '../helpers/TokenHelper';

const LoginScreen = () => {
  const navigation = useNavigation();
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
