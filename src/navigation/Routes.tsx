import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export interface RoutesProps {}

const Routes: React.FC<RoutesProps> = () => {
  const { data } = useSelector((state: AppState) => state.user);
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('@user_token');
      setUserToken(token || '');
    })();
  }, [data]);

  return (
    <NavigationContainer>
      {userToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

Routes.defaultProps = {};

export default Routes;
