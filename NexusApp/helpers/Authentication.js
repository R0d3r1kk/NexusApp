import {post, postFromAuth} from './ApiHelper';

export const login = (email, password) => {
  return postFromAuth('login', {email, password});
};

export const createAccount = (email, password) => {
  return postFromAuth('users', {email, password});
};
