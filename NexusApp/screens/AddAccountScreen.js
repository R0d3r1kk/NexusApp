import React from 'react';
import Form from '../components/Form';
import {addAccount} from '../helpers/Gestion';
import {validateContent, validateOption} from '../components/Validations';

const AddAccountScreen = ({navigation}) => {
  const handleResult = async result => {
    try {
      if (result) {
        navigation.navigate('Cuentas');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form
      navigation={navigation}
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
            keyboardType: 'default',
          },
        },
        account_client: {
          label: 'Account Client',
          input: {
            type: 'text',
          },
          validators: [validateContent],
          inputProps: {
            keyboardType: 'default',
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
        op_responsible_id: {
          input: {
            type: 'hidden',
          },
        },
      }}
    />
  );
};

export default AddAccountScreen;
