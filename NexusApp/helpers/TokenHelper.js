import AsyncStorage from '@react-native-community/async-storage';
import {post} from './ApiHelper';
import {TKN_URL, TKN_REF} from '../Settings';

export const DeleteStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    return null;
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@auth_token');
    if (value !== null) {
      return value;
    } else {
      var tkn = await GenerateToken();
      return tkn;
    }
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

const GenerateToken = async () => {
  try {
    var body = {username: TKN_REF, password: TKN_REF};
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
