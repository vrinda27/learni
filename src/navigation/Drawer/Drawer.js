//react components
import React from 'react';
//navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
//global

//stack
import AuthStack from '../AuthStack.js';

import CustomDrawer from './CustomDrawer.js';
import { SafeAreaView } from 'react-native';
// import {NativeModules} from 'react-native';
const Drawer = ({}) => {
    //variables
    const Drawer = createDrawerNavigator(); // Correctly initializes the Drawer Navigator
    const initialRouteName = 'AuthStack'; // Proper declaration of initialRouteName
    const options = {
        swipeEnabled: false,
    };

    //function: render function for custom drawer content
    const renderCustomDrawer = ({ navigation }) => (
        <SafeAreaView style={{ flex: 1 ,backgroundColor:'black'}}>
            {/* <CustomDrawer navigation={navigation} style={{paddingTop: NativeModules.StatusBarManager.HEIGHT}} /> */}
        </SafeAreaView>
    );

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    // Customize drawer style if needed
                },
            }}
            initialRouteName={initialRouteName} // Use the variable for better readability
            drawerContent={renderCustomDrawer}>
            <Drawer.Screen
                name="AuthStack" // Correct usage of Drawer.Screen
                options={options}
                component={AuthStack} // Pass AuthStack as the component
            />
        </Drawer.Navigator>
    );
};

export default Drawer;
