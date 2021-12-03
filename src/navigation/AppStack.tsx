import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import PhotoDetailScreen from '../screens/PhotoDetailScreen';
import HomeScreen from '../screens/HomeScreen';

export type AppStackParams = {
  Home: {};
  PhotoDetail: {
    photoId: number;
  };
};

const Stack = createStackNavigator<AppStackParams>();

export interface AppStackProps {}

const AppStack: React.FC<AppStackProps> = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='PhotoDetail' component={PhotoDetailScreen} />
    </Stack.Navigator>
  );
};

AppStack.defaultProps = {};

export default AppStack;
