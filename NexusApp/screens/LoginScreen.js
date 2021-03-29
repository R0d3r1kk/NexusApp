import React from 'react';
import {StyleSheet} from 'react-native';
import Form from '../components/Form';
import {login} from '../helpers/Authentication';
import {validateContent, validateLength} from '../components/Validations';
import jwt_decode from 'jwt-decode';
import {setToken} from '../helpers/TokenHelper';

const LoginScreen = ({navigation}) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    position: 'relative',
  },
});

export default LoginScreen;
