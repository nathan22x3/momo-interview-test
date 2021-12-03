import {
  BeVietnam_500Medium,
  BeVietnam_600SemiBold,
  useFonts,
} from '@expo-google-fonts/be-vietnam';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { Dimensions, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { theme, ThemeContext } from './src/contexts/ThemeContext';
import Routes from './src/navigation/Routes';
import { store } from './src/store';

const { width } = Dimensions.get('window');

export interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [fontsLoaded] = useFonts({
    BeVietnam_500Medium,
    BeVietnam_600SemiBold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeContext.Consumer>
        {() => (
          <Provider {...{ store }}>
            <StatusBar />
            <SafeAreaView style={styles.container}>
              <Routes />
            </SafeAreaView>
          </Provider>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
});
