import React from 'react';
import { Text, View } from 'react-native';

export interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
  return (
    <View>
      <Text>Home page</Text>
    </View>
  );
};

HomeScreen.defaultProps = {};

export default HomeScreen;
