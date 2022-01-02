import React from 'react';
import {LogBox} from 'react-native';
import {AppNavigator} from './src/app';
import {AppContextProvider} from './src/context';
import {AppearanceProvider} from 'react-native-appearance';

LogBox.ignoreLogs(['Require']);

export default (): JSX.Element => {
  return (
    <AppearanceProvider>
      <AppContextProvider>
        <AppNavigator />
      </AppContextProvider>
    </AppearanceProvider>
  );
};
