import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Alert,
  Animated,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {hasValidationError, validateFields} from './Validations';
import SubmitButton from './SubmitButton';
import Field from './Field';
import {primaryColor} from '../Settings';
import {getOnlyUser, rollBack} from '../helpers/TokenHelper';

const getInitialState = fieldKeys => {
  const state = {};
  fieldKeys.forEach(key => {
    state[key] = '';
  });

  return state;
};

const animationTimeout = () => new Promise(resolve => setTimeout(resolve, 300));

const Form = ({
  navigation,
  title,
  fields,
  buttonText,
  action,
  afterSubmit,
  okMessage,
}) => {
  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialState(fieldKeys));
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState(
    getInitialState(fieldKeys),
  );
  const [opacity] = useState(new Animated.Value(1));
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isActive = true;
    const fetchData = async () => {
      try {
        let data = await getOnlyUser();
        if (isActive) {
          if (data) {
            if (data.error) {
              await rollBack(navigation);
            }
          } else {
            if (user) {
              isActive = false;
            }
          }
          setUser(data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    return () => {
      isActive = false;
    };
  }, [user, navigation]);

  const onChangeValue = (key, value) => {
    const newState = {...values, [key]: value};
    setValues(newState);
  };

  const getValues = () => {
    return fieldKeys.sort().map(key => values[key]);
  };

  const fadeOut = () =>
    Animated.timing(opacity, {
      toValue: 0.2,
      duration: 200,
      useNativeDriver: true,
    }).start();

  const fadeIn = () =>
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

  const submit = async () => {
    setSubmitting(true);
    setErrorMessage('');
    setValidationErrors(getInitialState(fieldKeys));

    const errors = validateFields(fields, values);
    fadeOut();
    if (hasValidationError(errors)) {
      await animationTimeout();
      setSubmitting(false);
      fadeIn();
      return setValidationErrors(errors);
    }

    fadeOut();
    try {
      if (user) {
        values.op_responsible_id = user.user_id;
      }

      const [result] = await Promise.all([
        action(...getValues()),
        animationTimeout(),
      ]);
      if (okMessage) {
        Alert.alert('Bienvenid@!!', okMessage);
      }
      await afterSubmit(result);
      setSubmitting(false);
      fadeIn();
    } catch (e) {
      console.log(e);
      Alert.alert('Upss', e.error);
      setErrorMessage(e.error);
      setSubmitting(false);
      fadeIn();
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scroll}
      keyboardDismissMode="interactive"
      maintainVisibleContentPosition={true}>
      <Text style={styles.title}>{title}</Text>
      <Animated.View style={{opacity}}>
        {isSubmitting && (
          <View style={styles.activityIndicatorContainer}>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/images/logo.png')}
            />
          </View>
        )}
        {fieldKeys.map(key => {
          return (
            <Field
              key={key}
              fieldName={key}
              field={fields[key]}
              error={validationErrors[key]}
              onChange={onChangeValue}
              value={values[key]}
            />
          );
        })}
      </Animated.View>
      <SubmitButton
        title={buttonText}
        onPress={submit}
        isSubmitting={isSubmitting}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    position: 'relative',
    height: Dimensions.get('window').height,
  },
  activityIndicatorContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  error: {
    color: primaryColor,
    marginTop: 30,
    height: 17.5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 300,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    marginBottom: 40,
    fontWeight: 'bold',
    color: '#202a34',
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
  },
});
export default Form;
