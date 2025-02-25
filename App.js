//import : react components
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNavigationContainerRef} from '@react-navigation/native';
//import : stack
import AuthStack from 'navigation/AuthStack';
//import : notification
//import : third parties
import Toast from 'react-native-toast-message';
//import : globals
//import : redux
import {Provider} from 'react-redux';
import {store} from './src/reduxTooklit/Store';

const App = () => {
  //function

  const navigationRef = createNavigationContainerRef();
  //UI
  return (
    <>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <AuthStack />
          <Toast />
        </NavigationContainer>
      </Provider>
    </>
  );
};
export default App;
