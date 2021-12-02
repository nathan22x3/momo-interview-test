import { User, UserActions } from './userActions';

type UserState = {
  user: User;
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error?: string;
};

const initializeState: UserState = {
  user: {} as User,
  status: 'idle',
  error: '',
};

export const userReducer = (
  state: UserState = initializeState,
  action: UserActions
): UserState => {
  switch (action.type) {
    case '@USER/LOGIN':
      return { ...state, user: { ...state.user, token: action.token } };
    case '@USER/LOGIN_FAILURE':
      return { ...state, error: action.error };

    default:
      return state;
  }
};
