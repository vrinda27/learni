import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Background from 'assets/svgs/background.svg';
import Header from 'component/Header/Header';
import CertificateCard from 'component/Certificate/CertificateCard';
import OrderHistoryTab from 'component/OrderHistory/OrderHistoryTab';
import MySearchBarForHome from 'component/MySearchBarForHome';
import BillingTab from 'component/BillingTab/BillingTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors, ScreenNames, Service} from 'global/index';
import {API_Endpoints} from 'global/Service';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
const Billing = () => {
  const [orderHistoryData, setOrderHistoryData] = useState([
    {
      id: '1',
      creatorName: `Max Bryrant`,
      courseImg: '',
      courseName: `O'Reilly's tattoo machine Motor`,
      courseRating: '4.7',
      courseFee: '399.00',
      status: 'Picked-up',
      orderId: 'HBD898DMND8333',
      date: '26 Juny 2023 9:30AM',
      ago: '10h ago',
    },
    {
      id: '2',
      creatorName: `Nikhil Sam`,
      courseImg: '',
      courseName: `O'Reilly's tattoo machine Motor`,
      courseRating: '4.7',
      courseFee: '399.00',
      status: 'Packed',
      orderId: 'HBD898DMND8333',
      courseCompletedDate: '26 Juny 2023 9:30AM',
      ago: '10h ago',
      date: '26 Juny 2023 9:30AM',
    },
  ]);
  const getHome = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.allCards,
        token,
      );
      if (status) {
      }
    } catch (error) {
      console.error('error in getHome', error);
    }
  };
  //hook : useEffect
  useEffect(() => {
    getHome();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Background style={StyleSheet.absoluteFill} />

        <Header
          heading={'Order History'}
          showLearneLogo={false}
          showCart={false}
          showNotification={false}
          showBackButton={true}></Header>
        <MySearchBarForHome disabled placeHolder={'Search'} />
        <BillingTab
          orderHistoryData={orderHistoryData}
          // viewDetails={viewDetails}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Billing;
