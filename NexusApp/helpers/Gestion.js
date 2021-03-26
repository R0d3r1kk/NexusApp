import {get} from './ApiHelper';
import {CRU_URL} from '../Settings';

export const Users = async () => {
  return await get(CRU_URL + 'All');
};
