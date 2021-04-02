import AsyncStorage from '@react-native-community/async-storage';
import {TKN_URL} from '../Settings';
import jwt_decode from 'jwt-decode';

export const DeleteStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    return null;
  }
};

export const getOnlyUser = async () => {
  let user = null;
  try {
    let tkn = await getToken();
    if (tkn) {
      let token = jwt_decode(tkn);
      if (isExpired(token)) {
        throw {error: 'Session expirada!!, vuleve a iniciar sessión'};
      }
      if (token.UserData) {
        user = JSON.parse(token.UserData);
        return user;
      }
      throw {error: 'Session expirada!!, vuleve a iniciar sessión'};
    }
  } catch (e) {
    console.log(e);
    throw {error: 'Session expirada!!, vuleve a iniciar sessión'};
  }
};

export const getUser = async navigation => {
  let user = null;
  try {
    let token = await checkToken(navigation);
    user = JSON.parse(token.UserData);
    return user;
  } catch (e) {
    console.log(e);
    await rollBack(navigation);
  }
};

export const checkToken = async navigation => {
  try {
    let tkn = await getToken();
    if (tkn) {
      let token = jwt_decode(tkn);
      if (token) {
        if (token.UserData) {
          if (isExpired(token)) {
            await rollBack(navigation);
          }
          return token;
        } else {
          await rollBack(navigation);
        }
      }
    }

    await rollBack(navigation);
  } catch (e) {
    console.log(e);
    await rollBack(navigation);
  }
};

export const rollBack = async navigation => {
  await DeleteStorage();
  navigation.replace('Login', {
    error: 'Session expirada!!, vuleve a iniciar sessión',
  });
};

//TODO: Fix de fecha
function isExpired(token) {
  let currentTime = new Date();
  let expires_date = new Date(token.exp * 1000);
  return currentTime > expires_date;
}

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('@auth_token');
  } catch (e) {
    throw {
      error: 'Session expirada!!, vuleve a iniciar sessión',
    };
  }
};

export const setToken = async token => {
  try {
    await AsyncStorage.setItem('@auth_token', token);
  } catch (e) {
    throw {
      error: 'Session expirada!!, vuleve a iniciar sessión',
    };
  }
};

export const GenerateToken = async () => {
  var tkn_ref = randomString(10);
  try {
    var body = {username: tkn_ref, password: tkn_ref};
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const result = await fetch(TKN_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    var res = await checkStatus(result);
    if (res !== null) {
      await setToken(res);
      return res;
    }

    throw {
      error: 'Imposible generar nuevo token, intenta de nuevo...',
    };
  } catch (e) {
    throw {
      error: 'Imposible generar nuevo token, intenta de nuevo...',
    };
  }
};

function randomString(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function checkStatus(response) {
  if (response.ok) {
    const base64 = await response.json();
    return base64;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
