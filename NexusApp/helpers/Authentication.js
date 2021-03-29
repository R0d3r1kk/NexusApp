import {postFromAuth} from './ApiHelper';
import {DeleteStorage} from './TokenHelper';

export const login = (email, password) => {
  return postFromAuth('login', {email, password});
};

export const logout = async navigation => {
  await DeleteStorage();
  navigation.navigate('login');
};
