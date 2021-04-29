import {get, post} from './ApiHelper';

import {CRU_URL} from '../Settings';

export const Users = () => {
  return get(CRU_URL + 'All?key=users');
};

export const GetUser = (id, op_responsible_id) => {
  return post(CRU_URL + 'User', {
    id,
    op_responsible_id
  });
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

export const EditUser = (
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
  return post(CRU_URL + 'EditUser', {
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



export const Accounts = () => {
  return get(CRU_URL + 'All?key=accounts');
};

export const addAccount = (
  account_client,
  account_name,
  op_responsible_id,
  team_id,
) => {
  return post(CRU_URL + 'AddAccount', {
    account_name,
    account_client,
    team_id,
    op_responsible_id,
  });
};



export const Teams = () => {
  return get(CRU_URL + 'All?key=teams');
};

export const UserTeamChanges = () => {
  return get(CRU_URL + 'All?key=user_team_changes');
};
