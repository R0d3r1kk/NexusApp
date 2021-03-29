import React from 'react';
import Form from '../components/Form';
import {AddUser} from '../helpers/Gestion';
import {getUser} from '../helpers/TokenHelper';

import {
  validateContent,
  validateLength,
  validateOption,
} from '../components/Validations';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: {},
    };
    this.handleResult = this.handleResult.bind(this);
  }

  componentDidMount() {
    getUser(this.props.navigation).then(data => {
      this.setState({
        userdata: data,
      });
    });
  }

  handleResult(result) {
    try {
      if (result) {
        this.props.navigation.navigate('Home');
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Form
        title="Usuario"
        action={AddUser}
        afterSubmit={this.handleResult}
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
              items: [
                {label: 'Team 1', value: '0'},
                {label: 'Team 2', value: '1'},
                {label: 'Team 3', value: '2'},
              ],
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
              value: this.state.userdata ? this.state.userdata.user_id : '0',
            },
          },
        }}
      />
    );
  }
}

export default RegisterScreen;
