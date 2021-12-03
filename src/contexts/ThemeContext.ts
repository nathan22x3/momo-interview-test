import { createContext } from 'react';

export const theme = {
  label: '#000000',
  white: '#e3e3e3',
  placeholder: '#3c3c434c',
  momo: '#ae2070',
  grey: '#262626',
  textInput: '#e3e3e3',
};

export const ThemeContext = createContext(theme);
