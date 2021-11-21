import { keyring } from '@fnando/keyring';
import { SALT_KEY } from './constants';

function getEncryptedKey(key: string) {
  return {
    1: Buffer.from(key).toString('base64').slice(0, 43),
  };
}

function getEncryptor(key: string) {
  return keyring(getEncryptedKey(key), { digestSalt: SALT_KEY });
}

export function encrypt(textToEncrypt: string, key: string) {
  const encryptor = getEncryptor(key);

  return encryptor.encrypt(textToEncrypt);
}

export function decrypt(encrypted: string, key: string) {
  const encryptor = getEncryptor(key);

  return encryptor.decrypt(encrypted, '1');
}
