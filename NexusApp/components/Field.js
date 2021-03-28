import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {secondaryColor, primaryColor} from '../Settings';
import {Text, TextInput, View, StyleSheet, Animated} from 'react-native';
export default class Field extends React.Component {
  position = new Animated.Value(0);
  constructor(props) {
    super(props);
    this.state = {
      optionValue: '0',
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isSubmitting &&
      !this.props.isSubmitting &&
      this.props.error
    ) {
      this.shake();
    }
    this.setOptionValue = this.setOptionValue.bind(this);
  }

  setOptionValue(value) {
    this.setState({
      optionValue: value,
    });
  }

  render() {
    const {fieldName, field, value, onChange, error} = this.props;

    const option = field.input;
    switch (option.type) {
      case 'select':
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{field.label}</Text>

            <RNPickerSelect
              key={fieldName}
              useNativeAndroidPickerStyle={false}
              fixAndroidTouchableBug={false}
              placeholder={{
                label: 'Select ' + field.label,
                value: null,
              }}
              style={{...pickerSelectStyles}}
              onValueChange={(item, pos) => {
                if (item != null) {
                  onChange(fieldName, item);
                }
              }}
              items={option.items}
              value={value}
            />
            <Text style={styles.error}>{error}</Text>
          </View>
        );
      case 'text':
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              {...field.inputProps}
              value={value}
              onChangeText={text => onChange(fieldName, text)}
            />
            <Text style={styles.error}>{error}</Text>
          </View>
        );
      case 'hidden':
        return (
          <View style={styles.hiddenInput}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              autoFocus={true}
              style={styles.hiddenInput}
              value={option.value?.toString()}
              //onChangeText={text => onChange(fieldName, text)}
              onFocus={() => onChange(fieldName, option.value)}
            />
            <Text style={styles.error}>{error}</Text>
          </View>
        );
    }
  }

  shiftPosition(distance) {
    const duration = 50;
    return Animated.timing(this.position, {
      toValue: distance,
      duration,
      useNativeDriver: true,
    });
  }

  startShake = () => {
    const distance = 8;

    Animated.sequence([
      this.shiftPosition(distance),
      this.shiftPosition(-distance),
      this.shiftPosition(distance),
      this.shiftPosition(-distance),
      this.shiftPosition(distance),
      this.shiftPosition(0),
    ]).start();
  };

  shake() {
    setTimeout(this.startShake, 100);
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 10,
    color: secondaryColor,
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  error: {
    textAlign: 'center',
    height: 17.5,
    color: primaryColor,
    marginTop: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: secondaryColor,
  },
  hiddenInput: {
    width: 0,
    height: 0,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    height: 40,
    width: 300,
    fontSize: 14,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    color: secondaryColor,
    fontWeight: 'bold',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputIOS: {
    height: 40,
    width: 300,
    fontSize: 14,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    color: secondaryColor,
    fontWeight: 'bold',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
