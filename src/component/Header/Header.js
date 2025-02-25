import {
  View,
  Text,
  NativeModules,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  DrawerActions,
  useNavigation,
  useFocusEffect,
  CommonActions,
} from '@react-navigation/native';
import React, {useContext, useEffect, useState, useCallback} from 'react';

import ArrowLeft from 'assets/images/arrowLeft.svg';

import Notification from 'assets/images/notification.svg';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

//   import {FONTFAMILYMEDIUM} from 'assets/fonts';
import {APIEndPoints} from 'src/WebAPI/Service';

import {BlurView} from '@react-native-community/blur';
import {Image} from 'react-native-svg';
import Drawer from 'assets/images/drawer.svg';
import Logo from 'assets/svgs/logoLearne.svg';
import Cart from 'assets/images/shoppingBag.svg';

const Header = ({
  heading,
  onPressBack,
  onPressNotification,
  toggleSidebar,
  gradient = false,
  showBackButton = true,
  showNotification = false,
  showGridIcon = false,
  headingStyle = {},
  toggleSwitch = false,
  showLearneLogo = true,
  showCart = true,
  onSwitchToggle = isOn => console.debug('changed to : ', isOn),
  isSwitchOn = false,
  style,
}) => {
  const navigation = useNavigation();
  const [notificationCount, setNotificationCount] = useState(0);
  const onPressBackHandler = () => {
    // onPressBack && onPressBack();
    navigation?.goBack();
  };
  const onPressNotificationHandler = () => {
    navigation.navigate('Notification');
  };
  const openDrawer = () => {
    navigation.openDrawer();
  };

  // Update notification count on screen focus

  return (
    <SafeAreaView
      style={[
        styles.container,
        style,
        !gradient && {
          flexDirection: 'row',
          height: 84,
          backgroundColor: 'white',
          justifyContent: 'space-between',
        },
      ]}>
      <>
        <View
          style={[
            styles.card,
            {justifyContent: 'space-between', paddingLeft: responsiveWidth(4)},
          ]}>
          {showGridIcon && (
            <TouchableOpacity onPress={openDrawer}>
              {/* <Icon name="grid-outline" size={24} color="white" /> */}
              <Drawer></Drawer>
            </TouchableOpacity>
          )}

          {showBackButton && (
            <TouchableOpacity onPress={onPressBackHandler}>
              <ArrowLeft />
            </TouchableOpacity>
          )}
        </View>

        <View style={{...styles.card, flex: 4, justifyContent: 'center'}}>
          {heading && (
            <Text style={[styles.heading, headingStyle]}>{heading}</Text>
          )}
          {showLearneLogo && <Logo width={131} height={54}></Logo>}
        </View>

        <View style={[styles.card, {paddingRight: responsiveWidth(4)}]}>
          {showCart && (
            <TouchableOpacity
              onPress={onPressNotificationHandler}
              style={{marginRight: responsiveWidth(2)}}>
              <Cart height={24} width={24} />
            </TouchableOpacity>
          )}
          {showNotification && (
            <TouchableOpacity
              onPress={onPressNotificationHandler}
              style={{marginLeft: responsiveWidth(showCart ? 0 : 13)}}>
              <Notification height={24} width={24} />
            </TouchableOpacity>
          )}
        </View>
      </>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    // Shadow for iOS
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  gradientContainer: {
    flexDirection: 'row',
    paddingTop: NativeModules.StatusBarManager.HEIGHT,
    // paddingBottom: responsiveHeight(1),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    flexDirection: 'row',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  container: {},
  heading: {
    fontSize: responsiveFontSize(2.6),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    color: 'black',
    textAlign: 'center',
  },
  card: {
    flex: 1,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    // Debugging borders
  },
  thumbOnStyle: {
    backgroundColor: 'yellow', // Dot color when on
  },
  thumbOffStyle: {
    backgroundColor: 'yellow', // Dot color when off
  },
});
