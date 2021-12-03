import { User, UserActions } from './userActions';

type UserState = {
  data: User;
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error?: string;
};

const initializeState: UserState = {
  data: {} as User,
  status: 'idle',
  error: '',
};

export const userReducer = (
  state: UserState = initializeState,
  action: UserActions
): UserState => {
  switch (action.type) {
    case '@USER/LOGIN':
      return { ...state, status: 'loading', error: '' };
    case '@USER/LOGIN_SUCCESS':
      return {
        ...state,
        data: { ...state.data, email: action.email, token: action.token },
        status: 'loaded',
        error: '',
      };
    case '@USER/LOGIN_FAILURE':
      return { ...state, status: 'error', error: action.error };
    case '@USER/LOGOUT':
      return { ...state, data: {} as User, status: 'idle' };

    default:
      return state;
  }
};
