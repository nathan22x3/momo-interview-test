import axios from 'axios';
import { Dispatch } from 'react';

export interface User {
  email: string;
  token?: string;
}

export interface Login {
  readonly type: '@USER/LOGIN';
  token: string;
}

export interface LoginFailure {
  readonly type: '@USER/LOGIN_FAILURE';
  error?: string;
}

export type UserActions = Login | LoginFailure;

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<UserActions>) => {
    try {
      const res = await axios.post<{ token: string }>(
        'https://reqres.in/api/login',
        {
          email,
          password,
        }
      );
      dispatch({ type: '@USER/LOGIN', token: res.data.token });
    } catch (error) {
      dispatch({ type: '@USER/LOGIN_FAILURE', error: error as string });
    }
  };
