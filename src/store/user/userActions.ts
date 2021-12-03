import axios from 'axios';
import { Dispatch } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  email: string;
  token: string;
}

export interface Login {
  readonly type: '@USER/LOGIN';
}

export interface LoginSuccess {
  readonly type: '@USER/LOGIN_SUCCESS';
  email: string;
  token: string;
}

export interface LoginFailure {
  readonly type: '@USER/LOGIN_FAILURE';
  error?: string;
}

export interface Logout {
  readonly type: '@USER/LOGOUT';
}

export type UserActions = Login | LoginSuccess | LoginFailure | Logout;

export const login =
  (email: string, password: string) => (dispatch: Dispatch<UserActions>) => {
    dispatch({ type: '@USER/LOGIN' });
    axios
      .post<{ token: string }>('https://reqres.in/api/login', {
        email,
        password,
      })
      .then(async (res) => {
        await AsyncStorage.setItem('@user_token', res.data.token);
        dispatch({ type: '@USER/LOGIN_SUCCESS', email, token: res.data.token });
      })
      .catch((error: Error) =>
        dispatch({
          type: '@USER/LOGIN_FAILURE',
          error: error.message,
        })
      );
  };

export const logout = () => async (dispatch: Dispatch<UserActions>) => {
  await AsyncStorage.removeItem('@user_token');
  dispatch({ type: '@USER/LOGOUT' });
};
