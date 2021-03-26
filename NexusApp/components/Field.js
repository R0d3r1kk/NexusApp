import React from 'react';
import {Text, TextInput, View, StyleSheet, Animated} from 'react-native';
export default class Field extends React.Component {
  position = new Animated.Value(0);

  componentDidUpdate(prevProps) {
    if (
      prevProps.isSubmitting &&
      !this.props.isSubmitting &&
      this.props.error
    ) {
      this.shake();
    }
  }

  render() {
    const {fieldName, field, value, onChangeText, error} = this.props;
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{field.label}</Text>
        <TextInput
          style={styles.input}
          {...field.inputProps}
          value={value}
          onChangeText={text => onChangeText(fieldName, text)}
        />
        <Text style={styles.error}>{error}</Text>
      </View>
    );
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
    paddingHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  error: {textAlign: 'center', height: 17.5},
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
