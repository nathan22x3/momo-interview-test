import { createContext } from 'react';

export const theme = {
  label: '#000000',
  white: '#e3e3e3',
  secondaryLabel: '#3c3c4399',
  placeholder: '#3c3c434c',
  link: '#007aff',
  toolbar: '#e9eaed',
  background: '#f3f8ff',
  border: '#202020',
  red: '#ff3b30',
  orange: '#f2703F',
  green: '#34c759',
  blue: '#005dff',
  momo: '#ae2070',
  grey: '#262626',
  textInput: '#e3e3e3',
  facebook: '#4267B2',
};

export const ThemeContext = createContext(theme);
