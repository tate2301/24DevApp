import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {ReactNode, useState} from 'react';
import {StatusBar} from 'react-native';
import {useColorScheme} from 'react-native-appearance';

type ContextValues = {
  isCorrectAnswer: boolean;
  hasCheckedAnswer: boolean;
  selectedAnswer: string;
  correctAnswer: string;
};

export const AppContext = React.createContext({
  setValues: (values: ContextValues) => {},
  isCorrectAnswer: false,
  hasCheckedAnswer: false,
  selectedAnswer: '',
  correctAnswer: '',
});

export const AppContextProvider = ({children}: {children: ReactNode}) => {
  const colorScheme = useColorScheme();
  const [contextValues, setContextValues] = useState<ContextValues>({
    isCorrectAnswer: false,
    hasCheckedAnswer: false,
    selectedAnswer: '',
    correctAnswer: '',
  });

  const setValues = (values: ContextValues) => {
    setContextValues({...values});
  };

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar animated={true} barStyle={colorScheme === 'dark' ? 'dark-content' : 'default'} />
      <AppContext.Provider value={{...contextValues, setValues}}>{children}</AppContext.Provider>
    </NavigationContainer>
  );
};
