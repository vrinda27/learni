//import : react components
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
//import : components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import MyButton from 'component/MyButton/MyButton';
//import : third parties
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import {Colors, ScreenNames, Service} from 'global/index';
import CallSvg from 'assets/svgs/call.svg';
import SmsSvg from 'assets/svgs/sms.svg';
import BagSvg from 'assets/svgs/shopping-bag.svg';
import MedalSvg from 'assets/svgs/medal-star.svg';
import NotiSvg from 'assets/svgs/notification-bing.svg';
import DollarSvg from 'assets/svgs/dollar-circle.svg';
import HeartSvg from 'assets/svgs/heart.svg';
import RightSvg from 'assets/svgs/right-arrow.svg';
import {API_Endpoints} from 'global/Service';

const Profile = ({navigation}) => {
  //variables
  const isFocused = useIsFocused();
  //hook : states
  const [profileData, setProfileData] = useState({});
  //function : nav func
  const gotoEditProfile = () => {
    navigation.navigate(ScreenNames.EDIT_PROFILE, {data: profileData});
  };
  //function : serv func
  const getProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.profile,
        token,
      );
      if (status) {
        setProfileData(response.data);
      }
    } catch (error) {
      console.error('error in getProfile', error);
    }
  };

  //refrence
  const gotoTabs = title => {
    title === 'Order History'
      ? navigation.navigate(ScreenNames.COURSE_HISTORY)
      : title === 'Certificate'
      ? navigation.navigate(ScreenNames.CERTIFICATE)
      : title === 'Notifications'
      ? navigation.navigate(ScreenNames.NOTIFICATION)
      : navigation.navigate(ScreenNames.CART);
    // Ensure 'EditProfile' is a valid screen
  };

  const ProfileItem = ({icon, title}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2,
          backgroundColor: Colors.WHITE,
          padding: 10,
          marginVertical: 5,
          borderRadius: 5,
        }}
        onPress={() => gotoTabs(title)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 10,
          }}>
          {icon}
          <MyText text={title} />
        </View>

        <RightSvg />
      </TouchableOpacity>
    );
  };
  //hook : useffect
  useEffect(() => {
    getProfile();
    return () => {};
  }, [isFocused]);

  //UI
  return (
    <View style={styles.container}>
      <Header
        showBackButton={false}
        showNotification={true}
        showGridIcon={true}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: '30%',
        }}>
        <View style={styles.mainView}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: profileData.profile,
              }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
                borderWidth: 2,
              }}
            />
            <MyText text={profileData.name} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 5,
              }}>
              <CallSvg />
              <MyText text={profileData.mobile} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 5,
              }}>
              <SmsSvg />
              <MyText text={profileData.email} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <MyButton
              text={'Edit'}
              width="48%"
              onPress={() => gotoEditProfile()}
            />
            <MyButton
              text={'Change Password'}
              width="48%"
              backgroundColor={Colors.DARK_PURPLE}
            />
          </View>
          <ProfileItem icon={<BagSvg />} title={'Order History'} />
          <ProfileItem icon={<MedalSvg />} title={'Certificate'} />
          <ProfileItem icon={<NotiSvg />} title={'Notifications'} />
          <ProfileItem icon={<DollarSvg />} title={'Billing'} />
          <ProfileItem icon={<HeartSvg />} title={'Wishlist'} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    padding: 20,
  },
});
