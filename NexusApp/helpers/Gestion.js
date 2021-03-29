import {get, post} from './ApiHelper';
import {CRU_URL} from '../Settings';

export const Users = async () => {
  return await get(CRU_URL + 'All');
};

export const AddUser = (
  cv_link,
  email,
  eng_level,
  name,
  op_responsible_id,
  password,
  session_id,
  team_id,
  tecnic_knowledge,
) => {
  return post(CRU_URL + 'AddUser', {
    name,
    email,
    password,
    session_id,
    team_id,
    eng_level,
    tecnic_knowledge,
    cv_link,
    op_responsible_id,
  });
};

export const addAccount = ({
  account_client,
  account_name,
  team_id,
  operation_responsible,
}) => {
  return post(CRU_URL + 'AddUser', {
    account_name,
    account_client,
    team_id,
    operation_responsible,
  });
};
