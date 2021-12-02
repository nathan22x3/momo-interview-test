import React, { useContext, useEffect, useReducer } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/shared/Button';
import TextInput from '../components/shared/TextInput';
import { ThemeContext } from '../contexts/ThemeContext';
import { AppState } from '../store';
import { login } from '../store/user/userActions';

const { width } = Dimensions.get('window');

export interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  const theme = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { user, error, status } = useSelector((state: AppState) => state.user);

  const [userInfo, setUserInfo] = useReducer(
    (state: Record<string, string>, newState: Record<string, string>) => ({
      ...state,
      ...newState,
    }),
    { username: '', password: '' }
  );

  const handleInputChange = (key: string, value: string) => {
    setUserInfo({ [key]: value });
  };

  useEffect(() => {
    console.log({ user, error });
  }, [user]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require('../../assets/momo-logo.png')}
          resizeMode='center'
          width={100}
        />
      </View>
      <TextInput
        placeholder={'Username'}
        onChangeText={(value) => handleInputChange('username', value)}
      />
      <TextInput
        placeholder={'Password'}
        secureTextEntry={true}
        onChangeText={(value) => handleInputChange('password', value)}
      />
      <Button
        style={styles.button}
        color={theme.label}
        onPress={() => dispatch(login(userInfo.username, userInfo.password))}
        disabled={!userInfo.username || !userInfo.password}
      >
        Login
      </Button>
    </KeyboardAvoidingView>
  );
};

LoginScreen.defaultProps = {};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    paddingHorizontal: 20,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginBottom: 50,
  },
  button: {
    width: '100%',
  },
  separator: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    borderWidth: 0.7,
    marginTop: 15,
    marginBottom: 25,
  },
  separatorText: {
    position: 'absolute',
    padding: 10,
    transform: [{ translateY: -20 }],
    fontFamily: 'BeVietnam_500Medium',
    textTransform: 'uppercase',
  },
});
