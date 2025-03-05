import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Background from 'assets/svgs/background.svg';
import Header from 'component/Header/Header';
import {Colors, ScreenNames, Service} from 'global/index';
import {API_Endpoints, PostApi} from '../../global/Service';
import MyText from 'component/MyText/MyText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CertificateCard from 'component/Certificate/CertificateCard';
import OrderHistoryTab from 'component/OrderHistory/OrderHistoryTab';
import MySearchBarForHome from 'component/MySearchBarForHome';
import NotificationCard from 'component/Notification/NotificationCard';
const Notification = () => {
  const [notification, setNotification] = useState([]);
  const getNotification = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.notification,
        token,
      );
      if (status) {
        setNotification(response?.data);
      }
    } catch (error) {
      console.error('error in getHome', error);
    }
  };

  //clear all notification
  const clearNotification = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await PostApi(
        API_Endpoints.clearNotification,
        '',
        token,
      );
      if (response?.data?.status) {
        Toast.show({
          type: response?.data?.status ? 'success' : 'error',
          text1: response?.data?.message,
        });
        setNotification([]);
      } else {
        Toast.show({
          type: response?.data?.status ? 'success' : 'error',
          text1: response?.data?.message,
        });
      }
    } catch (error) {}
  };
  useEffect(() => {
    getNotification();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Background style={StyleSheet.absoluteFill} />

        <Header
          showNotification={true}
          heading={'Notifications'}
          showLearneLogo={false}
          showCart={false}
          showBackButton={true}></Header>
        <TouchableOpacity onPress={() => clearNotification()}>
          <MyText
            text={'Clear All'}
            fontFamily={'regular'}
            fontSize={14}
            textColor={Colors.DARK_PURPLE}
            style={{textAlign: 'right', marginRight: 12}}
          />
        </TouchableOpacity>
        <NotificationCard
          orderHistoryData={notification}
          // viewDetails={viewDetails}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
