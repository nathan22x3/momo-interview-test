import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export interface RoutesProps {}

const Routes: React.FC<RoutesProps> = () => {
  const { user } = useSelector((state: AppState) => state.user);

  return (
    <NavigationContainer>
      {user.token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

Routes.defaultProps = {};

export default Routes;
