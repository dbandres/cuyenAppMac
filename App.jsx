/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { Home } from "./src/Home";
import { store } from "./src/redux/store";
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { Intro } from "./src/intoScreen/Intro";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { UserProvider } from "./src/context/UserContext";

function App() {

  return (
    <Provider store={store}>
      <UserProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </UserProvider>
    </Provider>
  );
}



export default App;
