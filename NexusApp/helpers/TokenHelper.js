import AsyncStorage from '@react-native-community/async-storage';
import {post} from './ApiHelper';
import {TKN_URL} from '../Settings';
import jwt_decode from 'jwt-decode';

export const DeleteStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    return null;
  }
};

export const getUser = async navigation => {
  try {
    let token = await checkToken(navigation);
    let user = JSON.parse(token.UserData);
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const checkToken = async navigation => {
  try {
    let tkn = await getToken();
    if (tkn) {
      let token = jwt_decode(tkn);
      if (isExpired(token)) {
        await rollBack(navigation);
      }
      return token;
    }

    await rollBack(navigation);
  } catch (e) {
    console.log(e);
    await rollBack(navigation);
  }
};

const rollBack = async navigation => {
  await DeleteStorage();
  navigation.replace('Login');
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
    return null;
  }
};

export const setToken = async token => {
  try {
    await AsyncStorage.setItem('@auth_token', token);
  } catch (e) {
    return null;
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
  } catch (e) {
    return null;
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
