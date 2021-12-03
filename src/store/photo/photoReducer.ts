import { Photo, PhotoActions } from './photoActions';

type PhotoState = {
  items: Photo[];
  currentItem: Photo;
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error?: string;
};

const initializeState: PhotoState = {
  items: [],
  currentItem: {} as Photo,
  status: 'idle',
  error: '',
};

export const photoReducer = (
  state: PhotoState = initializeState,
  action: PhotoActions
): PhotoState => {
  switch (action.type) {
    case '@PHOTO/GET_ALL':
    case '@PHOTO/GET':
      return { ...state, status: 'loading' };
    case '@PHOTO/GET_ALL_SUCCESS':
      return { ...state, items: action.items, status: 'loaded' };
    case '@PHOTO/GET_ALL_FAILURE':
    case '@PHOTO/GET_FAILURE':
      return { ...state, status: 'error', error: action.error };

    case '@PHOTO/GET_SUCCESS':
      return { ...state, currentItem: action.item };

    case '@PHOTO/CLEAR':
      return { ...state, currentItem: {} as Photo };
    default:
      return state;
  }
};
