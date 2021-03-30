/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {Users, Accounts, Teams} from '../helpers/Gestion';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

test('the data is a correct list of users', async () => {
  await expect(Users()).resolves.toBe('Users');
});

test('the methos usesrs fails with an error', async () => {
  await expect(Users()).rejects.toMatch('error');
});

test('the data is a correct list of accounts', async () => {
  await expect(Accounts()).resolves.toBe('Accounts');
});

test('the method accounts fails with an error', async () => {
  await expect(Accounts()).rejects.toMatch('error');
});

test('the data is a correct list of teams', async () => {
  await expect(Teams()).resolves.toBe('Teams');
});

test('the method Teams fails with an error', async () => {
  await expect(Teams()).rejects.toMatch('error');
});
