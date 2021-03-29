import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import Form from '../components/Form';
import {addAccount} from '../helpers/Gestion';
import {validateContent, validateOption} from '../components/Validations';
import {getUser} from '../helpers/TokenHelper';

const AddAccountScreen = ({navigation}) => {
  const [user, setUser] = useState(async () => await getUser(navigation));
  const handleResult = async result => {
    try {
      if (result) {
        navigation.replace('Accounts');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form
      title="Agregar Cuenta"
      action={addAccount}
      afterSubmit={handleResult}
      buttonText="Agregar"
      fields={{
        account_name: {
          label: 'Account Name',
          input: {
            type: 'text',
          },
          validators: [validateContent],
          inputProps: {
            keyboardType: 'deafutl',
          },
        },
        account_client: {
          label: 'Account Client',
          input: {
            type: 'text',
          },
          validators: [validateContent],
          inputProps: {
            keyboardType: 'deafutl',
          },
        },
        team_id: {
          label: 'User Team',
          input: {
            type: 'select',
            selectedValue: '',
            items: [
              {label: 'Team 1', value: '0'},
              {label: 'Team 2', value: '1'},
              {label: 'Team 3', value: '2'},
            ],
          },
          validators: [validateOption],
        },
        operation_responsible: {
          input: {
            type: 'hidden',
            value: user ? user.user_id : '0',
          },
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    position: 'relative',
  },
});

export default AddAccountScreen;
