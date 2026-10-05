import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthContext from './src/context/Auth';
import RootNavigator from './src/navigator/RootNavigator';

export default function App() {
  return (
    <AuthContext>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthContext>
  );
}