//import : react components
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

import {
  NavigationContainer,
  StackActions,
  useIsFocused,
} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

// import { CommonActions } from '@react-navigation/core';
// //import : custom components
// import MyText from '../../Components/MyText/MyText';
// import CustomLoaderLogout from 'components/CustomLoader/CustomLoaderLogout';
//import : global
// import Color, { dimensions } from '../../Global/Color';
//import : styles
import {styles} from './CustomDrawerStyle';

//import : modal
//import : third parties
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
//import : redux
// import { useSelector, useDispatch } from 'react-redux';
// import { logOutUser, setUser } from 'src/reduxToolkit/reducer/user';
import {useDrawerStatus} from '@react-navigation/drawer';

const CustomDrawer = ({navigation}) => {
  const {getAPI, loading, postAPI} = useAPI();
  const navigationn = useNavigation(); // Use hook to access navigation

  const authToken = useSelector(state => state.auth.user);

  const isFocussed = useIsFocused();
  const isFocused = useIsFocused();
  //variables
  // const userToken = useSelector(state => state.user.userToken);
  // const dispatch = useDispatch();
  //hook : states
  const [showLoader, setShowLoader] = useState(false);
  const [notificationCount, setNotificationCount] = useState(false);
  //function : imp function
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  //function : navigation function
  // const closeDrawer = () => navigation.closeDrawer();
  // const resetIndexGoToSignup = CommonActions.reset({
  //     index: 1,
  //     routes: [{ name: ScreenNames.SIGN_UP_1 }],
  // });
  const gotoSignUp = () => {
    // closeDrawer();
    // navigation.dispatch(resetIndexGoToSignup);
  };
  const gotoHome = () => {
    // navigation.navigate(ScreenNames.BOTTOM_TAB, { screen: ScreenNames.HOME });
  };
  const gotoSuperAdminCourses = () => {
    // navigation.navigate(ScreenNames.SUPER_ADMIN_COURSES);
  };
  const gotoAllProducts = () => {
    // navigation.navigate(ScreenNames.ALL_PRODUCTS);
  };
  const gotoMyWhishlist = () => {
    // navigation.navigate(ScreenNames.BOTTOM_TAB, {
    //     screen: ScreenNames.WISHLIST,
    // });
  };
  const gotoMyOrders = () => {
    navigation.navigate('MyListing');
  };
  const gotoWelcome = () => {};
  // CommonActions.reset({
  //     index: 1,
  //     routes: [{ name: ScreenNames.WELCOME }],
  // });
  //   const logout = async () => {
  //     const isLogout = await handleLogoutAndNavigate();
  //     if (isLogout) {
  //       const resetIndexGoToWelcome = CommonActions.reset({
  //         index: 1,
  //         routes: [{name: 'SignIn'}],
  //       });
  //       navigateAndDispatchFromRef(resetIndexGoToWelcome);
  //       dispatch(clearToken());
  //       navigation.closeDrawer();
  //     }
  //     return;
  //     // try {
  //     //     const resp = await Service.postApiWithToken(
  //     //         userToken,
  //     //         Service.LOGOUT,
  //     //         {},
  //     //     );
  //     //     if (resp?.data?.status) {
  //     //         closeDrawer();
  //     //         navigation.dispatch(gotoWelcome);
  //     //         dispatch(logOutUser());
  //     //         await AsyncStorage.clear();
  //     //     }
  //     // } catch (error) {
  //     // }
  //     const {res, err} = await postAPI({endPoint: APIEndPoints.logout});
  //     if (res) {
  //       // await AsyncStorage.clear()
  //       // dispatch(clearToken())
  //       //   const resetIndexGoToWelcome = CommonActions.reset({
  //       //     index: 1,
  //       //     routes: [{ name: 'SignIn' }],
  //       //   });
  //       // // navigation.dispatch(resetIndexGoToWelcome);
  //       // navigateAndDispatchFromRef(resetIndexGoToWelcome)
  //     }
  //   };

  //UI
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{backgroundColor: 'white'}}>
        <View style={styles.profileView}>
          <View style={styles.profile}>
            <Image
              style={{width: 50, height: 50, borderRadius: 25, marginLeft: 6}}
              // source={
              //   authToken?.profile
              //     ? { uri: authToken.profile }
              //     : require('../../assets/Images/profile.png')
              // }
            />
            <View style={styles.info}>
              {/* <Text style={styles.profileName}>{authToken?.name}</Text>
              <Text style={styles.profileEmail}>{authToken?.email}</Text> */}
            </View>
            <TouchableOpacity>
              {/* <LinearGradient
                colors={['#060606', '#393939']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.gradientBackground}>
                <Text
                  style={{color: '#D7BC70', fontSize: 14, fontWeight: '700'}}>
                  View
                </Text>
              </LinearGradient> */}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{padding: 10, marginVertical: 10}}>
          <DrawerItemList
            Title="Home"
            // image={require('../../assets/Images/homeDrawer.png')}
            // onPress={gotoHome}
          />
          <DrawerItemList
            Title="Appointments"
            // image={require('../../assets/Images/appointment.png')}
            //  onPress={()=>{navigation.navigate('Appointments')}}
            //  onPress={() => {
            //   navigation.navigate('MyListing');
            // }}
            onPress={() =>
              navigation.navigate('AuthStack', {
                screen: 'Appointments', // Target screen name inside AuthStack
                params: {
                  /* optional parameters */
                },
              })
            }
            // onPress={gotoMyOrders}
          />
          <DrawerItemList
            Title="Select Plan"
            // image={require('../../assets/Images/appointment.png')}
            //  onPress={()=>{navigation.navigate('Appointments')}}
            //  onPress={() => {
            //   navigation.navigate('MyListing');
            // }}
            onPress={() =>
              navigation.navigate('AuthStack', {
                screen: 'Plans', // Target screen name inside AuthStack
                params: {onlyForPayment: true},
              })
            }
            // onPress={gotoMyOrders}
          />
          <DrawerItemList
            Title="Terms & Conditions"
            // image={require('../../assets/Images/stickynote.png')}
            // onPress={() => { }}
          />
          <DrawerItemList
            Title={`Chat Support `}
            // image={require('../../assets/Images/privacy.png')}
            onPress={() => {
              navigation.navigate('Chat');
              // You can add additional logic here if needed
            }}
          />
          <DrawerItemList
            Title="Logout"
            // image={require('../../assets/Images/logout.png')}
            onPress={logout}
          />
        </View>
        <View style={styles.socialMedia}>
          <Text style={{fontSize: 12, fontWeight: '400', color: 'white'}}>
            Follow Us!
          </Text>
          <View style={styles.iconRow}>
            {/* <Image source={require('../../assets/Images/Facebook.png')} />
            <Image source={require('../../assets/Images/Instagram.png')} />
            <Image source={require('../../assets/Images/Youtube.png')} /> */}
          </View>
        </View>
      </ScrollView>

      {/* <CustomLoader text="Logging Out...." showLoader={showLoader} /> */}
    </View>
  );
};
export default CustomDrawer;
export const DrawerItemList = ({Title = '', image, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        // width: '90%',
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={image}
          style={{width: 24, height: 24, marginRight: 10}}
        />
        {/* <MyText
            text={Title}
            fontSize={14}
            textColor="white"
            fontFamily="medium"
            style={{marginLeft: 14}}
          /> */}
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 14,
            fontWeight: '500',
            color: 'white',
          }}>
          {Title}
        </Text>
      </View>
      {/* <Image source={require('assets/images/white-right.png')} /> */}
    </TouchableOpacity>
  );
};
