import RNSimpleCrypto from 'react-native-simple-crypto';

const toUtf8 = RNSimpleCrypto.utils.convertArrayBufferToUtf8;
const toBase64 = RNSimpleCrypto.utils.convertArrayBufferToBase64;

async function encryptData(input, key) {
  const messageArrayBuffer = RNSimpleCrypto.utils.convertUtf8ToArrayBuffer(
    input,
  );

  const keyArrayBuffer = RNSimpleCrypto.utils.convertUtf8ToArrayBuffer(key);

  const ivArrayBuffer = RNSimpleCrypto.utils.convertUtf8ToArrayBuffer(
    key.substring(0, 16),
  );

  const cipherTextArrayBuffer = await RNSimpleCrypto.AES.encrypt(
    messageArrayBuffer,
    keyArrayBuffer,
    ivArrayBuffer,
  );

  return toBase64(cipherTextArrayBuffer);
}

async function decryptData(input, key, iv) {
  const messageArrayBuffer = RNSimpleCrypto.utils.convertUtf8ToArrayBuffer(
    input,
  );
  const keyArrayBuffer = RNSimpleCrypto.utils.convertUtf8ToArrayBuffer(key);

  const ivArrayBuffer = RNSimpleCrypto.utils.convertUtf8ToArrayBuffer(
    key.substring(0, 16),
  );

  const cipherTextArrayBuffer = await RNSimpleCrypto.AES.decrypt(
    messageArrayBuffer,
    keyArrayBuffer,
    ivArrayBuffer,
  );

  return toBase64(cipherTextArrayBuffer);
}

export {encryptData, decryptData};