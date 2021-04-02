/**
 * @format
 */

import 'react-native';

import {Users, Accounts, Teams} from '../helpers/Gestion';

const user = {
  4: {name: 'Admin'},
  5: {name: 'Super Admin'},
  6: {name: 'User'},
};

jest.mock('../__mocks__/requests.js');

it('works with promises', () => {
  expect.assertions(1);
  return user.getUserName(4).then(data => expect(data).toEqual('Mark'));
});

it('the data is a correct list of users', async () => {
  await expect(Users()).resolves.toBe('Users');
});

it('the method usesrs fails with an error', async () => {
  await expect(Users()).rejects.toMatch('error');
});

it('the data is a correct list of accounts', async () => {
  await expect(Accounts()).resolves.toBe('Accounts');
});

it('the method accounts fails with an error', async () => {
  await expect(Accounts()).rejects.toMatch('error');
});

it('the data is a correct list of teams', async () => {
  await expect(Teams()).resolves.toBe('Teams');
});

it('the method Teams fails with an error', async () => {
  await expect(Teams()).rejects.toMatch('error');
});
