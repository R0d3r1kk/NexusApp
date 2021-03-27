import {get, post} from './ApiHelper';
import {CRU_URL} from '../Settings';

export const Users = async () => {
  return await get(CRU_URL + 'All');
};

export const AddUser = (
  name,
  email,
  password,
  session_id,
  team_id,
  op_responsible_id,
) => {
  return post(CRU_URL + 'AddUser', {
    name,
    email,
    password,
    session_id,
    team_id,
    op_responsible_id,
  });
};
