import React, {useEffect, useState} from 'react';
import {View, FlatList, ScrollView, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
//import : custom components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';

import Toast from 'react-native-toast-message';
//import : global
import {Colors, ScreenNames, Service} from 'global/index';
//import : styles
import {styles} from './CartStyle';
//import : modal
//import : redux
import {connect, useSelector} from 'react-redux';
import {dimensions} from 'global/Constants';
import Divider from 'component/Divider/Divider';
import MyButton from 'component/MyButton/MyButton';

import ViewAll from 'component/ViewAll/ViewAll';
import {createThumbnail} from 'react-native-create-thumbnail';
// import { setCartCount } from '../../../reduxToolkit/reducer/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_Endpoints} from 'global/Service';
import Item from 'component/Item/Item';
import {
  responsiveHeight as hg,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Background from 'assets/svgs/background.svg';
import CartItem from 'component/CartItem/CartItem';
import SizeBox from 'component/SizeBox/SizeBox';
import { MEDIUM } from 'global/Fonts';
// import Item from '../../../components/Item/Item';
// import ShippingModal from '../../../modals/ShippingModal/ShippingModal';

const Cart = ({navigation, dispatch}) => {
  const focused = useIsFocused();
  // let { params } = useRoute();
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const userToken = useSelector(state => state.user.userToken);
  const userInfo = useSelector(state => state.user.userInfo);
  const [showLoader, setShowLoader] = useState(false);
  // const [searchValue, setSearchValue] = useState('');
  // const [promoCode, setPromoCode] = useState('');
  const [cartListData, setCartListData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [address, setAddress] = useState(null);
  const [coupon, setCoupon] = useState({
    applied: false,
    item: null,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [_currentProductId, _setCurrentProductId] = useState(null);
  const [allAppliedCoupons, setAllAppliedCoupons] = useState([]);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    checkcon();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const getHome = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.cartList,
        token,
      );
      if (status) {
        setCartListData(response?.data);
      }
    } catch (error) {
      console.error('error in getHome', error);
    }
  };
  const getCartList = async () => {
    setShowLoader(true);
    try {
      const resp = await Service.getApiWithToken(userToken, Service.CART_LIST);
      if (!resp?.data?.status) {
        setCartListData({});
      }
      if (resp?.data?.status) {
        const temp1 = resp?.data?.data?.items.filter(
          item => item.is_coupon_applied === true,
        );
        if (temp1?.length > 0) {
          const temp2 = temp1.map((item, index) => {
            const myCode = item?.coupons?.filter(
              e => e.code === item.coupon_code,
            );
            return {
              applied: true,
              item: {...myCode[0], productId: item.product_id},
            };
          });
          setAllAppliedCoupons(temp2);
        } else {
          setAllAppliedCoupons([]);
        }
        if (resp?.data?.data?.shippingAddressId) {
          const tempAddress = resp?.data?.address?.filter(
            item => item.id === resp.data.data.shippingAddressId?.address_id,
          );

          if (tempAddress.length > 0) {
            setAddress(tempAddress);
          } else {
            setAddress([]);
          }
        } else if (!resp?.data?.data?.shippingAddressId) {
          setAddress([]);
        }
        // after removing items getCartLit function is called again, checking if no items in data, then set cart count to 0
        if (resp?.data?.data?.length === 0) {
          dispatch(setCartCount(resp?.data?.data?.length));
          await AsyncStorage.setItem(
            'cart_count',
            JSON.stringify(resp?.data?.data?.length),
          );
        }
        // const doCoursesExists = resp?.data?.data?.items.find(el => el?.type == '1');
        const doCoursesExists = resp?.data?.type === 1;
        if (!doCoursesExists) {
          setCartListData(resp?.data);
        } else {
          // const data = await generateThumb(resp?.data?.data);
          // resp.data.data.items = [...resp?.data?.data];
          setCartListData(resp?.data);
        }
        // Toast.show({text1: resp?.data?.message})
      } else {
        // empty cart toast msg
        // Toast.show({ text1: resp?.data?.message });
      }
    } catch (error) {}
    setShowLoader(false);
  };

  const gotoShippingScreen = () => {
    navigation.navigate(ScreenNames.BILLING);
    // if (cartListData.type === 1) {
    //   navigation.navigate(ScreenNames.PROCEED_TO_PAYMENT);
    // } else {
    //   if (address.length > 0) {

    //   } else {
    //     Toast.show({
    //       type: 'info',
    //       text1: 'Please choose an address',
    //     });
    //   }
    // }
  };

  const modalHandler = (id = null) => {
    if (id) {
      _setCurrentProductId(id);
    }
    if (isModalVisible) {
      setIsModalVisible(false);
    } else {
      setIsModalVisible(true);
    }
  };

  const showAllAddress = () => {
    navigation.navigate(ScreenNames.ADDRESSESS);
  };
  //hook : useEffect
  useEffect(() => {
    getHome();
  }, [focused]);
  //UI
  return (
    <View style={styles.container}>
      <Header
        showNotification={false}
        heading={'Shopping Cart'}
        showLearneLogo={false}
        showCart={false}
        showBackButton={true}
      />
      <ScrollView style={styles.mainView}>
        <Background style={StyleSheet.absoluteFill} />
        {cartListData?.items?.length > 0 ? (
          <View>
            <FlatList
              data={cartListData?.items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return <CartItem item={item} />;
              }}
            />
            <>
              <ViewAll
                text="Order Summary"
                showSeeAll={false}
                style={{marginTop: 41, marginHorizontal: 15}}
              />
              <View
                style={[
                  styles.summaryContainer,
                  {
                    width: dimensions.SCREEN_WIDTH * 0.95,
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: Colors.LIGHT_PURPLE,
                    marginTop: 14,
                  },
                ]}>
                <View style={[styles.row, {marginBottom: 10}]}>
                  <MyText
                    text={`Subtotal (${
                      cartListData?.items?.length > 0
                        ? cartListData?.items?.length
                        : 0
                    })`}
                    fontSize={16}
                    fontFamily={MEDIUM}
                    textColor={Colors.DARK_PURPLE}
                    style={{}}
                  />
                  <MyText
                    text={
                      cartListData?.subTotal
                        ? '$' + Number(cartListData?.subTotal)?.toFixed(2)
                        : '$' + 0
                    }
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
                    text={
                      cartListData?.tax
                        ? '$' + Number(cartListData?.tax)?.toFixed(2)
                        : '$' + 0
                    }
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
                    text={
                      cartListData?.totalPrice
                        ? '$' + Number(cartListData?.totalPrice)?.toFixed(2)
                        : '$' + 0
                    }
                    fontSize={18}
                    fontFamily={MEDIUM}
                    textColor={'#292D32'}
                    style={{}}
                  />
                </View>
              </View>
              <MyButton
                text={'Proceed to payment'}
                style={{
                  width: dimensions.SCREEN_WIDTH * 0.95,
                  marginBottom: 10,
                  backgroundColor: Colors.GREEN,
                  marginTop: 32,
                  alignSelf: 'center',
                }}
                onPress={gotoShippingScreen}
              />
              <SizeBox height={30} />
            </>
          </View>
        ) : (
          <View style={{alignItems: 'center', marginTop: 50}}>
            <MyText
              text={'Your cart is empty'}
              fontFamily={MEDIUM}
              fontSize={40}
              textAlign="center"
              textColor={'black'}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(Cart);
