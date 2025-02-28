//import : react components
import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
//import : utils
import {ScreenNames} from 'global/index';
//import : screens
import Splash from 'screens/Splash/Splash';
import Welcome from 'screens/Welcome/Welcome';
import SignUp from 'screens/Auth/SignUp';
import Signin from 'screens/Auth/Signin';
import BottomTab from './BottomTab/BottomTab';
import EditProfile from 'screens/Profie/EditProfile/EditProfile';
import CourseCategory from 'screens/CourseCategory/CourseCategory';
import CourseDetail from 'screens/CourseDeatils/CourseDetail';
import SubCategories from 'screens/CourseCategory/SubCategories/SubCategories';

const AuthStack = () => {
  //variables
  const Stack = createStackNavigator();
  //UI
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // set the headerShown option to false to hide the header
      }}>
      <Stack.Screen name={ScreenNames.SPLASH} component={Splash} />
      <Stack.Screen name={ScreenNames.WELCOME} component={Welcome} />
      <Stack.Screen name={ScreenNames.SIGN_IN} component={Signin} />
      <Stack.Screen name={ScreenNames.SIGN_UP} component={SignUp} />
      <Stack.Screen name={ScreenNames.BOTTOM_TAB} component={BottomTab} />
      <Stack.Screen name={ScreenNames.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen
        name={ScreenNames.COURSE_CATEGORY}
        component={CourseCategory}
      />
      <Stack.Screen name={ScreenNames.COURSE_DETAIL} component={CourseDetail} />
      <Stack.Screen name={ScreenNames.SUB_CATEGORY} component={SubCategories} />
      {/* 
     
    
       <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
       <Stack.Screen name="Disclaimers" component={Disclaimers} /> */}
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
export default AuthStack;
