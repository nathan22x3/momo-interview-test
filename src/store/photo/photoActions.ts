import axios from 'axios';
import { Dispatch } from 'react';
import { store } from '../index';

export interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface GetPhotos {
  readonly type: '@PHOTO/GET_ALL';
}

export interface GetPhotosSuccess {
  readonly type: '@PHOTO/GET_ALL_SUCCESS';
  items: Photo[];
}

export interface GetPhotosFailure {
  readonly type: '@PHOTO/GET_ALL_FAILURE';
  error?: string;
}

export interface GetPhoto {
  readonly type: '@PHOTO/GET';
}

export interface GetPhotoSuccess {
  readonly type: '@PHOTO/GET_SUCCESS';
  item: Photo;
}

export interface GetPhotoFailure {
  readonly type: '@PHOTO/GET_FAILURE';
  error?: string;
}

export interface ClearPhoto {
  readonly type: '@PHOTO/CLEAR';
}

export type PhotoActions =
  | GetPhotos
  | GetPhotosSuccess
  | GetPhotosFailure
  | GetPhoto
  | GetPhotoSuccess
  | GetPhotoFailure
  | ClearPhoto;

export const getPhotos =
  (searchText: string = '') =>
  async (dispatch: Dispatch<PhotoActions>) => {
    dispatch({ type: '@PHOTO/GET_ALL' });

    try {
      const res = await axios.get<Photo[]>(
        'https://jsonplaceholder.typicode.com/photos',
        {
          headers: {
            token: store.getState().user.data.token,
          },
          params: {
            q: searchText,
          },
        }
      );
      dispatch({ type: '@PHOTO/GET_ALL_SUCCESS', items: res.data });
    } catch (error) {
      dispatch({ type: '@PHOTO/GET_ALL_FAILURE', error: error as string });
    }
  };

export const getPhoto =
  (id: number) => async (dispatch: Dispatch<PhotoActions>) => {
    dispatch({ type: '@PHOTO/GET' });

    try {
      const res = await axios.get<Photo>(
        `https://jsonplaceholder.typicode.com/photos/${id}`,
        {
          headers: {
            token: store.getState().user.data.token,
          },
        }
      );
      dispatch({ type: '@PHOTO/GET_SUCCESS', item: res.data });
    } catch (error) {
      dispatch({ type: '@PHOTO/GET_FAILURE', error: error as string });
    }
  };

export const clearPhoto = () => (dispatch: Dispatch<PhotoActions>) => {
  dispatch({ type: '@PHOTO/CLEAR' });
};
