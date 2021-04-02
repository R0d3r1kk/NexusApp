import React, {useState, useEffect} from 'react';
import Form from '../components/Form';
import {AddUser} from '../helpers/Gestion';
import {Teams} from '../helpers/Gestion';

import {
  validateContent,
  validateLength,
  validateOption,
} from '../components/Validations';

const RegisterScreen = ({navigation}) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    let isActive = true;
    const fetchData = async () => {
      try {
        let data = JSON.parse(await Teams());
        if (isActive) {
          if (data) {
            let list = [];
            for (let i = 0; i < data.length; i++) {
              list.push({label: data[i].name, value: data[i].team_id});
            }
            setTeams(list);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    return () => {
      isActive = false;
    };
  }, [teams]);

  const handleResult = result => {
    try {
      if (result) {
        navigation.navigate('Usuarios');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form
      navigation={navigation}
      title="Usuario"
      action={AddUser}
      afterSubmit={handleResult}
      buttonText="Agregar usuario"
      fields={{
        name: {
          label: 'Name',
          input: {
            type: 'text',
          },
          validators: [validateContent, validateLength],
          inputProps: {
            keyboardType: 'default',
          },
        },
        email: {
          label: 'Email',
          input: {
            type: 'text',
          },
          validators: [validateContent, validateLength],
          inputProps: {
            keyboardType: 'email-address',
          },
        },
        password: {
          label: 'Password',
          input: {
            type: 'text',
          },
          validators: [validateContent, validateLength],
          inputProps: {
            secureTextEntry: true,
          },
        },
        session_id: {
          label: 'User Type',
          input: {
            type: 'select',
            selectedValue: '',
            items: [
              {label: 'Super Admin', value: '0'},
              {label: 'Admin', value: '1'},
              {label: 'User', value: '2'},
            ],
          },
          validators: [validateOption],
        },
        team_id: {
          label: 'User Team',
          input: {
            type: 'select',
            selectedValue: '',
            items: teams,
          },
          validators: [validateOption],
        },
        eng_level: {
          label: 'English Level',
          input: {
            type: 'select',
            selectedValue: '',
            items: [
              {label: 'Básico', value: 'Basic (A1)'},
              {label: 'Intermedio', value: 'Intermedio (B1)'},
              {label: 'Avanzado', value: 'Advanced (C1)'},
              {label: 'Lengua nativa', value: 'Native lenguage'},
            ],
          },
          validators: [validateOption],
        },
        tecnic_knowledge: {
          label: 'Tecnic Knowledge',
          input: {
            type: 'text',
          },
          validators: [validateContent],
          inputProps: {
            keyboardType: 'default',
          },
        },
        cv_link: {
          label: 'CV LINK (Google Drive)',
          input: {
            type: 'text',
          },
          validators: [validateContent],
          inputProps: {
            keyboardType: 'default',
          },
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

export default RegisterScreen;
