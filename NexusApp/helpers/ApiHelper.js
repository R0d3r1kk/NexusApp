import {getToken, DeleteStorage} from './TokenHelper';
import {AUTH_URL, NKEY} from '../Settings';
import {encryptData, decryptData} from './CryptoHelper';

const getHeaders = async () => {
  //await DeleteStorage();
  const token = await getToken();
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }

  return headers;
};

export const postFromAuth = async (destination, body) => {
  const headers = await getHeaders();
  const data = await encryptData(JSON.stringify(body), NKEY);
  const result = await fetch(AUTH_URL + destination, {
    method: 'POST',
    headers,
    //body: JSON.stringify(body),
    body: data,
  });
  return await checkStatus(result);
};

export const getFromAuth = async destination => {
  const headers = await getHeaders();

  const result = await fetch(AUTH_URL + destination, {
    method: 'GET',
    headers,
  });
  return await checkStatus(result);
};

export const get = async url => {
  const headers = await getHeaders();

  const result = await fetch(url, {
    method: 'GET',
    headers,
  });
  return await checkStatus(result);
};

export const post = async (url, body) => {
  const headers = await getHeaders();
  const data = await encryptData(JSON.stringify(body), NKEY);
  const result = await fetch(url, {
    method: 'POST',
    headers,
    //body: JSON.stringify(body),
    body: data,
  });
  return await checkStatus(result);
};

async function checkStatus(response) {
  switch (response.status) {
    case 200:
      const base64 = await response.json();
      return await decryptData(base64, NKEY, NKEY.substring(0, 16));
    case 401:
      await DeleteStorage();
      throw {error: 'Acceso denegado'};
    case 404:
      throw {error: 'El usuario no existe'};
    case 500:
      await DeleteStorage();
      throw {error: 'Generando token intenta de nuevo...'};
    default:
      if (response.ok) {
        const base64 = await response.json();
        return await decryptData(base64, NKEY, NKEY.substring(0, 16));
      } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
  }
}
