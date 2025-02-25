import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {styles} from './MyTextInputStyle';

const MyTextInput = ({
  value,
  onChangeText = () => {},
  placeholder = 'Enter here',
  leftIcon,
}) => {
  return (
    <View style={styles.container}>
      {leftIcon && leftIcon}
      <TextInput
        value={value}
        placeholder={placeholder}
        style={styles.textInput}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default MyTextInput;
