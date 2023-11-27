/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {ToastProvider} from 'react-native-paper-toast';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigation from './src/navigations/RootNavigation';
import AuthProvider from './src/providers/AuthenticationProvider';
import { setCustomText } from 'react-native-global-props';
import { useFonts } from 'expo-font';

const App = () => {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
  });


  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PaperProvider theme={theme}>
          <ToastProvider>
            <NavigationContainer>
              <RootNavigation />
            </NavigationContainer>
          </ToastProvider>
        </PaperProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#273B9A',
    accent: '#273B9A',
  },
};

export default App;
