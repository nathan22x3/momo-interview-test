import React, { useContext, useReducer, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/shared/Button';
import TextInput from '../components/shared/TextInput';
import { theme, ThemeContext } from '../contexts/ThemeContext';
import { AppState } from '../store';
import { login } from '../store/user/userActions';
import { isValidEmail } from '../utils/validation';

export interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { error, status } = useSelector((state: AppState) => state.user);
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');

  const [userInfo, setUserInfo] = useReducer(
    (state: Record<string, string>, newState: Record<string, string>) => ({
      ...state,
      ...newState,
    }),
    { email: '', password: '' }
  );

  const handleInputChange = (key: string, value: string) => {
    setUserInfo({ [key]: value });
  };

  const handleLogin = () => {
    setEmailError('');
    setLoginError('');
    if (!isValidEmail(userInfo.email)) {
      setEmailError('Please enter a valid email!');
    } else {
      dispatch(login(userInfo.email.trim(), userInfo.password.trim()));
      if (error) setLoginError('User not found!');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.logo}>
        <Image
          style={{ flex: 1 }}
          source={require('../../assets/momo-logo.png')}
          resizeMode='contain'
        />
      </View>
      {!!emailError && <Text style={styles.errorText}>{emailError}</Text>}
      <TextInput
        placeholder={'Email'}
        onChangeText={(value) => handleInputChange('email', value)}
      />
      <TextInput
        placeholder={'Password'}
        secureTextEntry={true}
        onChangeText={(value) => handleInputChange('password', value)}
      />
      <Button
        color={theme.label}
        onPress={handleLogin}
        disabled={!userInfo.email || !userInfo.password}
        loading={status === 'loading'}
      >
        Login
      </Button>
      {!!loginError && (
        <Text style={[styles.errorText, { textAlign: 'center' }]}>
          {loginError}
        </Text>
      )}
    </KeyboardAvoidingView>
  );
};

LoginScreen.defaultProps = {};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    height: 100,
  },
  errorText: {
    marginBottom: 5,
    fontFamily: 'BeVietnam_500Medium',
    color: theme.momo,
  },
});
