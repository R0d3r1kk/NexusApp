import React, {useState} from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const SubmitButton = ({title, onPress, isSubmitting}) => {
  const [offset] = useState(new Animated.Value(1));
  const [scale] = useState(new Animated.Value(1));

  const handlePress = async () => {
    Animated.spring(offset, {
      useNativeDriver: true,
      toValue: 5,
    }).start();
    Animated.spring(scale, {
      useNativeDriver: true,
      toValue: 0.96,
    }).start();

    await onPress();
    Animated.spring(offset, {
      useNativeDriver: true,
      toValue: 0,
    }).start();
    Animated.spring(scale, {
      useNativeDriver: true,
      toValue: 1,
    }).start();
  };

  const transform = [{translateY: offset}, {scaleY: scale}, {scaleX: scale}];

  return (
    <TouchableWithoutFeedback onPressIn={handlePress}>
      <Animated.View style={{transform, ...styles.container}}>
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: '#202a34',
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    width: 250,
    elevation: 4,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubmitButton;
