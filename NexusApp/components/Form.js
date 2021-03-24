import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {hasValidationError, validateFields} from './Validations';

const getInitialState = fieldKeys => {
  const state = {};
  fieldKeys.forEach(key => {
    state[key] = '';
  });

  return state;
};

const Form = ({fields, buttonText, action, afterSubmit}) => {
  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialState(fieldKeys));
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState(
    getInitialState(fieldKeys),
  );

  const onChangeValue = (key, value) => {
    const newState = {...values, [key]: value};
    setValues(newState);
  };

  const getValues = () => {
    return fieldKeys.sort().map(key => values[key]);
  };

  const submit = async () => {
    setErrorMessage('');
    setValidationErrors(getInitialState(fieldKeys));

    const errors = validateFields(fields, values);
    if (hasValidationError(errors)) {
      console.log(errors);
      return setValidationErrors(errors);
    }

    try {
      const result = await action(...getValues());
      await afterSubmit(result);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {fieldKeys.map(key => {
        const field = fields[key];
        const fieldError = validationErrors[key];
        return (
          <View key={key}>
            <Text>{field.label}</Text>
            <TextInput
              style={styles.input}
              {...field.inputProps}
              value={values[key]}
              onChangeText={text => onChangeValue(key, text)}
            />
            <Text>{fieldError}</Text>
          </View>
        );
      })}
      <Button style={styles.submit} title={buttonText} onPress={submit} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
  },
  submit: {
    position: 'absolute',
    borderRadius: 10,
    marginTop: 30,
  },
});

export default Form;
