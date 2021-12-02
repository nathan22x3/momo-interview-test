import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export interface AuthStackProps {}

const AuthStack: React.FC<AuthStackProps> = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
    </Stack.Navigator>
  );
};

AuthStack.defaultProps = {};

export default AuthStack;
