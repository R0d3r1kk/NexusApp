import React, {useEffect, useState} from 'react';
import {
  validateContent,
  validateLength,
  validateOption,
} from '../components/Validations';

import {AddUser} from '../helpers/Gestion';
import Form from '../components/Form';
import {Teams} from '../helpers/Gestion';

const RegisterScreen = ({props}) => {
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
        props.navigation.navigate('Usuarios');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form
      navigation={props.navigation}
      title="Usuario"
      action={AddUser}
      afterSubmit={handleResult}
      buttonText={props.route.params.user ? "Editar usuario" : "Agregar usuario"}
      fields={{
        name: {
          label: 'Name',
          value: props.route.params.user.name,
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
          value: props.route.params.user.email,
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
          value: props.route.params.user.password,
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
          value: props.route.params.user.session_id,
          input: {
            type: 'select',
            selectedValue: '',
            items: [
              {label: 'Super Admin', value: 0},
              {label: 'Admin', value: 1},
              {label: 'User', value: 2},
            ],
          },
          validators: [validateOption],
        },
        team_id: {
          label: 'User Team',
          value: props.route.params.user.team_id,
          input: {
            type: 'select',
            selectedValue: '',
            items: teams,
          },
          validators: [validateOption],
        },
        eng_level: {
          label: 'English Level',
          value: props.route.params.user.eng_level,
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
          value: props.route.params.user.tecnic_knowledge,
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
          value: props.route.params.user.cv_link,
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
