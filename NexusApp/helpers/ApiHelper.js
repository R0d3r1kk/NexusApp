import {getToken, setToken} from './TokenHelper';
import {AUTH_URL, NKEY, NTKN} from '../Settings';
import {encryptData, decryptData} from './CryptoHelper';

const getHeaders = async () => {
  await setToken(NTKN);
  const token = await getToken();
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = 'Bearer ${token}';
  }

  return headers;
};

export const post = async (destination, body) => {
  const headers = await getHeaders();
  console.log(AUTH_URL + destination);
  const data = await encryptData(JSON.stringify(body), NKEY);
  console.log(data);
  const result = await fetch(AUTH_URL + destination, {
    method: 'POST',
    mode: 'cors',
    headers,
    //body: JSON.stringify(body),
    body: data,
  });
  await checkStatus(result);
};

export const get = async destination => {
  const headers = await getHeaders();

  const result = await fetch(AUTH_URL + destination, {
    method: 'GET',
    headers,
  });
  await checkStatus(result);
};

async function checkStatus(response) {
  if (response.ok) {
    const base64 = await response.json();
    const res = await decryptData(base64, NKEY);
    return JSON.stringify(res);
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
