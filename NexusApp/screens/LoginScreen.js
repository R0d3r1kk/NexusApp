import React from 'react';
import Form from '../components/Form';
import {login} from '../helpers/Authentication';
import {validateContent, validateLength} from '../components/Validations';
import jwt_decode from 'jwt-decode';
import {setToken} from '../helpers/TokenHelper';

const LoginScreen = ({navigation}) => {
  const handleResult = async result => {
    try {
      setToken(result);
      var userToken = jwt_decode(result);
      navigation.replace('home', {
        userdata: userToken,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form
      title="Bienvenid@!!"
      action={login}
      afterSubmit={handleResult}
      buttonText="Log In"
      fields={{
        email: {
          label: 'Email',
          validators: [validateContent],
          inputProps: {
            keyboardType: 'email-address',
          },
        },
        password: {
          label: 'Password',
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
