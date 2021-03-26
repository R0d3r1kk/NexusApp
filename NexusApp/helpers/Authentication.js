import {post} from './ApiHelper';

export const login = (email, password) => {
  return post('login', {email, password});
};

export const createAccount = (email, password) => {
  return post('users', {email, password});
};
