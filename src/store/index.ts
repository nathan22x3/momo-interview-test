import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { photoReducer } from './photo/photoReducer';
import { userReducer } from './user/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  photo: photoReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
