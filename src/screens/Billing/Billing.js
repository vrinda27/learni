//import : react components
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Switch,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
  ImageBackground,
  TextInput,
  SafeAreaView,
  StatusBar,
  Keyboard,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';
import Loader from 'component/loader/Loader';
//import : third parties
// import { ScrollView } from 'react-native-virtualized-view';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
//import : global

//import : styles
import {styles} from './BillingStyle';
//import : modal
//import : redux
import {connect, useSelector} from 'react-redux';
import {dimensions} from 'global/Constants';
import Divider from 'component/Divider/Divider';
import MyButton from 'component/MyButton/MyButton';

import ViewAll from 'component/ViewAll/ViewAll';
import SuccessfulyPurchased from 'modals/SuccessfulyPurchased.js/SuccessfulyPurchased';
import {CommonActions} from '@react-navigation/native';
import AddCard from 'modals/AddCard/AddCard';
import {ScreenNames, Service, Colors} from 'global/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from 'assets/svgs/background.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from 'component/Header/Header';
import {API_Endpoints} from 'global/Service';
import {MEDIUM} from 'global/Fonts';
import {GREEN, WHITE} from 'global/Color';
const Billing = ({navigation, dispatch}) => {
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccessfulyPurchasedModal, setShowSuccessfulyPurchasedModal] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState('');
  const [cardList, setCardList] = useState([
    {
      id: '1',
      // img: require('assets/images/mastercard.png'),
      cardNum: '1111 1111 1111 5967',
      expires: '24/22',
    },
    {
      id: '2',
      // img: require('assets/images/visa.png'),
      cardNum: '1111 1111 1111 5967',
      expires: '24/22',
    },
  ]);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [screenData, setScreenData] = useState({});
  const [card, setCard] = useState(null);
  const [madePayment, setMadePayment] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showCard, setShowCard] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowCard(false), 5000);
    setTimeout(() => setShowCard(true), 6000);
  }, []);
  useEffect(() => {
    getData();
    getHome();
  }, []);
  const checkcon = () => {
    getData();
    getHome();
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    checkcon();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);
  const getData = async () => {
    setShowLoader(true);
    try {
      const token = await AsyncStorage.getItem('token');

      const {response, status} = await Service.getAPI(
        API_Endpoints.cart_detail,
        token,
      );
      if (status) {
        setScreenData(response);
      } else {
        Toast.show({
          type: 'error',
          text1: response?.message,
        });
      }
    } catch (error) {
      console.error('error in getData', error);
    }
    setShowLoader(false);
  };
  const getHome = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.card_list,
        token,
      );

      if (status) {
        console.error('my response data for card list--->>>>', response?.data);
      }
    } catch (error) {
      console.error('error in getHome', error);
    }
  };

  const resetIndexGoToUserBottomTab = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.BOTTOM_TAB}],
  });
  const handlePayClick = async (
    order_id,
    total_amount,
    stripeToken,
    cardID,
  ) => {
    setShowLoader(true);
    try {
      const myData = new FormData();
      myData.append('stripeToken', stripeToken);
      myData.append('order_id', order_id);
      myData.append('total_amount', Number(total_amount));

      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.postAPI(
        API_Endpoints.buy_now,
        myData,
        token,
      );

      if (status) {
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        setMadePayment(true);

        openSuccessfulyPurchasedModal();
      }
    } catch (error) {
      console.error('error in handlePayClick', error);
    }
    setShowLoader(false);
  };
  const onConfirm = async () => {
    if (madePayment) {
      Toast.show({text1: 'You have already made payment'});
      return;
    } else if (card === 0) {
      Toast.show({text1: 'Please enter card details'});
      return;
    } else if (!card?.complete) {
      Toast.show({text1: 'Please enter a valid card details'});
      return;
    }
    const postData = new FormData();
    // postData.append('card_id', 5);

    setShowLoader(true);
    try {
      const res = await createToken({card, type: 'Card'});

      // return
      if (res?.error) {
        if (res?.error?.message) {
          Toast.show({text1: res?.error?.message});
          Toast.show({
            type: 'error',
            text1: res?.error?.message,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Incorrect Card details',
          });
        }
        return;
      }
      // const resp = {};
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.postAPI(
        API_Endpoints.save_order,
        '',
        token,
      );

      if (status) {
        handlePayClick(
          response?.data?.order_id,
          response?.data?.total_amount,
          res?.token?.id,
          res?.token?.card?.id,
        );
        getData();
      } else {
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
      }
      // if (resp?.data?.status) {
      //   handlePayClick(
      //     resp?.data?.order_id,
      //     resp?.data?.total_amount,
      //     res?.token?.id,
      //   );
      //   // Toast.show({text1: resp.data.message});
      //   // openSuccessfulyPurchasedModal();
      //   // navigation.dispatch(resetIndexGoToUserBottomTab);
      // } else {
      //   Toast.show({
      //     text1: resp.data?.message,
      //   });
      // }
    } catch (error) {
      setShowLoader(false);
    } finally {
      setShowLoader(false);
    }
  };
  const handlePayPress = async () => {
    if (!card?.complete) {
      Toast.show('Please enter complete card details');
      return;
    }
    controlLoader(true);
  };
  const openSuccessfulyPurchasedModal = () => {
    setShowSuccessfulyPurchasedModal(true);
  };
  const openAddCardModal = () => {
    setShowAddCardModal(true);
  };
  const resetIndexGoToMyOrders = CommonActions.reset({
    index: 1,
    // routes: [{name: ScreenNames.MY_ORDERS}],
    routes: [
      {
        name: ScreenNames.BOTTOM_TAB,
        state: {
          routes: [{name: ScreenNames.MY_ORDERS}],
        },
      },
    ],
  });
  const gotoMyCourses = () => {
    navigation.dispatch(resetIndexGoToMyOrders);
  };
  const changeSelectedCard = id => {
    setSelectedCard(id);
  };
  const deleteCard = id => {
    const cardListCopy = [...cardList];
    const updatedData = cardListCopy.filter(el => el.id !== id);
    setCardList([...updatedData]);
    // setSelectedCard(id);
  };

  //UI
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        showNotification={false}
        heading={'Check Out'}
        showLearneLogo={false}
        showCart={false}
        showBackButton={true}
      />
      <ScrollView style={styles.mainView}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          {/* <View style={styles.summaryContainer}>
              <View style={[styles.row, { marginBottom: 10 }]}>
                <MyText
                  text={`Subtotal (${screenData?.order_count ? screenData?.order_count : 0})`}
                  fontSize={14}
                  fontFamily="medium"
                  textColor={'#455A64'}
                  style={{}}
                />
                <MyText
                
                  text={'$' + (screenData?.sub_total
                    ? screenData?.sub_total : 0)}
                  fontSize={14}
                  fontFamily="medium"
                  textColor={'#455A64'}
                  style={{}}
                />
              </View>
              <View style={[styles.row, { marginBottom: 10 }]}>
                <MyText
                  text={`Discount`}
                  fontSize={14}
                  fontFamily="medium"
                  textColor={'#8F93A0'}
                  style={{}}
                />
                <MyText
                  text={
                    screenData?.shipping_cost > 0
                      ? '+$' + screenData?.shipping_cost?.toFixed(2)
                      : '$0'
                  }
               
                  text={screenData?.discount > 0 ? ('-$' + screenData?.discount) : '$0'}
                  fontSize={14}
                  fontFamily="medium"
                  textColor={'#8F93A0'}
                  style={{}}
                />
              </View>
             
              <View style={[styles.row, { marginBottom: 19 }]}>
                <MyText
                  text={`Tax`}
                  fontSize={14}
                  fontFamily="medium"
                  textColor={'#8F93A0'}
                  style={{}}
                />
                <MyText
                  text={screenData?.tax > 0 ? ('+$' + screenData?.tax) : '$0'}
                  fontSize={14}
                  fontFamily="medium"
                  textColor={'#8F93A0'}
                  style={{}}
                />
              </View>
            )}
            <View style={[styles.row, {marginBottom: 19}]}>
              <MyText
                text={`Tax`}
                fontSize={14}
                fontFamily="medium"
                textColor={'#8F93A0'}
                style={{}}
              />
              <MyText
                text={screenData?.tax > 0 ? '+$' + screenData?.tax : '$0'}
                fontSize={14}
                fontFamily="medium"
                textColor={'#8F93A0'}
                style={{}}
              />
            </View>
            {/* <View style={[styles.row, {marginBottom: 19}]}>
                <MyText
                  text={`Shipping`}
                  fontSize={14}
              
              <Divider style={{ borderColor: '#E0E0E0' }} />
              <View style={[styles.row, { marginTop: 14 }]}>
                <MyText
                  text={`Total`}
                  fontSize={18}
                  fontFamily="medium"
                  textColor={'#455A64'}
                  style={{}}
                />
                <MyText
                 
                  text={'$' + (screenData?.total ? screenData?.total : 0)}
                  fontSize={18}
                  fontFamily="medium"
                  textColor={'#455A64'}
                  style={{}}
                />
              </View>
            </View> */}
          <ViewAll
            text="Order Summary"
            showSeeAll={false}
            style={{marginHorizontal: 5}}
          />
          <View
            style={[
              styles.summaryContainer,
              {
                width: dimensions.SCREEN_WIDTH * 0.9,
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: Colors.LIGHT_PURPLE,
                marginTop: 14,
              },
            ]}>
            <View style={[styles.row, {marginBottom: 10}]}>
              <MyText
                text={`Subtotal (${
                  screenData?.order_count ? screenData?.order_count : 0
                })`}
                fontSize={16}
                fontFamily={MEDIUM}
                textColor={Colors.DARK_PURPLE}
                style={{}}
              />
              <MyText
                text={'$' + (screenData?.sub_total ? screenData?.sub_total : 0)}
                fontSize={16}
                fontFamily={MEDIUM}
                textColor={Colors.DARK_PURPLE}
                style={{}}
              />
            </View>

            <View style={[styles.row, {marginBottom: 19}]}>
              <MyText
                text={`Tax`}
                fontSize={14}
                fontFamily={MEDIUM}
                textColor={Colors.GREEN}
                style={{}}
              />
              <MyText
                text={screenData?.tax > 0 ? '+$' + screenData?.tax : '$0'}
                fontSize={14}
                fontFamily={MEDIUM}
                textColor={Colors.GREEN}
                style={{}}
              />
            </View>
            <Divider
              style={{borderColor: '#E0E0E0'}}
              color={Colors.LIGHT_PURPLE}
            />
            <View style={[styles.row, {marginTop: 14}]}>
              <MyText
                text={`Total`}
                fontSize={18}
                fontFamily={MEDIUM}
                textColor={'#292D32'}
                style={{}}
              />
              <MyText
                text={'$' + (screenData?.total ? screenData?.total : 0)}
                fontSize={18}
                fontFamily={MEDIUM}
                textColor={'#292D32'}
                style={{}}
              />
            </View>
          </View>
          {/* <ViewAll
              text="Please enter card details"
              showSeeAll={true}
              buttonText="Add New"
               onPress={openAddCardModal}
              style={{
              width:'auto',
                marginTop: 25,
                marginBottom: 21,
                marginHorizontal:10
              }}
            /> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 16,
            }}>
            <MyText
              text={'Please enter card details'}
              fontSize={18}
              fontFamily={MEDIUM}
              textColor={'#292D32'}
              style={{}}
            />
            <View
              style={{
                width: 75,
                height: 44,
                borderRadius: 5,
                backgroundColor: GREEN,
                justifyContent: 'center',
                alignItems: 'center',
                // Shadow for iOS
                shadowColor: '#000000',
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.05, // Equivalent to `#0000000D` (HEX opacity for 5%)
                shadowRadius: 13,
                // Shadow for Android
                elevation: 4,
              }}>
              <MyText
                text={'Add New'}
                fontSize={14}
                fontFamily={MEDIUM}
                textColor={WHITE}
                style={{}}
              />
            </View>
          </View>
          {showCard && (
            <CardField
              postalCodeEnabled={true}
              onCardChange={cardDetails => {
                setCard(cardDetails);
              }}
              style={{
                height: 50,
                marginVertical: 10,
                borderWidth: 0.2,
                borderColor: GREEN,
              }}
            />
          )}
          {screenData?.data?.length > 0 ? (
            screenData?.data?.map(item => (
              <TouchableOpacity
                key={item.card_id}
                onPress={() => {
                  changeSelectedCard(item.card_id);
                }}
                style={[
                  styles.cardContainer,
                  item.card_id === selectedCard
                    ? {borderWidth: 1, borderColor: Colors.THEME_GOLD}
                    : null,
                ]}>
                <View style={styles.cardContainerLeftRow}>
                  <View style={{marginLeft: 12}}>
                    <MyText
                      text={'**** **** **** ' + item.card_number.slice(-5)}
                      // text={item.card_number}
                      fontSize={16}
                      fontFamily="medium"
                      textColor={'#261313'}
                    />
                    <MyText
                      text={`Expires ${item.valid_upto}`}
                      fontSize={14}
                      fontFamily="light"
                      textColor={Colors.LIGHT_GREY}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    deleteCard(item.id);
                  }}>
                  {/* <Image source={require('assets/images/trash.png')} /> */}
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <MyText
              text={`No Cards found`}
              fontFamily="medium"
              fontSize={18}
              textColor={'#455A64'}
              style={{textAlign: 'center', marginTop: 20}}
            />
          )}
          {/* <MyButton
              text="CONFIRM"
              style={{
                width: dimensions.SCREEN_WIDTH * 0.9,
                marginBottom: 10,
                backgroundColor: Colors.THEME_BROWN,
                marginTop: 32,
              }}
              // onPress={openSuccessfulyPurchasedModal}
              onPress={onConfirm}
            // onPress={handlePayClick}
            /> */}
          <MyButton
            text={'Pay Now'}
            style={{
              width: dimensions.SCREEN_WIDTH * 0.95,
              marginBottom: 10,
              backgroundColor: Colors.GREEN,
              marginTop: 32,
              alignSelf: 'center',
            }}
            onPress={onConfirm}
          />
        </KeyboardAwareScrollView>

        <SuccessfulyPurchased
          visible={showSuccessfulyPurchasedModal}
          setVisibility={setShowSuccessfulyPurchasedModal}
          gotoMyCourses={gotoMyCourses}
        />
        <AddCard
          visible={showAddCardModal}
          setVisibility={setShowAddCardModal}
          // setShowLoader={setShowLoader}
          userToken={userToken}
          callFunctionAfterAddingcard={getHome}
        />
      </ScrollView>
      <Loader visible={showLoader} />
    </SafeAreaView>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(Billing);

// // const getCardImage = type => {
// //   if (type === 'VISA') {
// //     return require('assets/images/visa.png');
// //   } else if (type === 'MASTERCARD') {
// //     return require('assets/images/mastercard.png');
// //   } else {
// //     return require('assets/images/mastercard.png');
// //   }
// // };
// import React, { useState } from "react";
// import { View, Button, Alert } from "react-native";
// export default function Billing() {
//   const { createPaymentMethod } = useStripe();
//   const [cardDetails, setCardDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const handlePayPress = async () => {

//     if (!cardDetails?.complete) {
//       Alert.alert("Invalid Card", "Please enter valid card details.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { paymentMethod, error } = await createPaymentMethod({
//         paymentMethodType: "Card",  // ✅ Ensure the type is set
//         card: cardDetails,
//       });

//       if (error) {
//         console.error("❌ Payment Error:", error);
//         Alert.alert("Payment Failed", error.message);
//         setLoading(false);
//         return;
//       }

//       Alert.alert("Success", `Payment Method Created: ${paymentMethod.id}`);

//       // Send paymentMethod.id to backend
//       // processPayment(paymentMethod.id);
//     } catch (err) {
//       console.error("🔥 Unexpected Error:", err);
//       Alert.alert("Unexpected Error", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   ;
//   const processPayment = async (paymentMethodId) => {
//     try {
//       const response = await fetch("https://your-server.com/pay", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ paymentMethodId }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         Alert.alert("Payment Successful", "Your payment was processed!");
//       } else {
//         Alert.alert("Payment Failed", data.message);
//       }
//     } catch (error) {
//       Alert.alert("Server Error", "Something went wrong");
//     }
//   };
//   return (
//     <View style={{ padding: 20 }}>
//       <CardField
//         postalCodeEnabled={true}
//         onCardChange={(cardDetails) => setCardDetails(cardDetails)}
//         style={{
//           height: 50,
//           marginVertical: 10,
//         }}
//       />
//       <Button title="Pay" onPress={handlePayPress} disabled={loading} />
//     </View>
//   );
// }
