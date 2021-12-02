import React, { useContext } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native';
import { ThemeContext } from '../../contexts/ThemeContext';

export interface TextInputProps extends RNTextInputProps {
  style?: StyleProp<TextStyle>;
  ref?: React.LegacyRef<RNTextInput>;
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const theme = useContext(ThemeContext);

  return (
    <RNTextInput
      {...props}
      style={[
        styles.container,
        {
          backgroundColor: theme.textInput,
          borderColor: theme.grey,
          color: theme.label,
        },
        props.style,
      ]}
      placeholderTextColor={theme.placeholder}
      underlineColorAndroid={'transparent'}
      ref={props.ref}
    />
  );
};

TextInput.defaultProps = {};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 15,

    fontFamily: 'BeVietnam_500Medium',
  },
});
