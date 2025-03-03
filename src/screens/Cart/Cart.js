import React, { useEffect, useRef, useState } from 'react';
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
  RefreshControl,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useIsFocused, useRoute, } from '@react-navigation/native';
//import : custom components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';



import Toast from 'react-native-toast-message';
//import : global
import {Colors, ScreenNames, Service} from 'global/index';
//import : styles
import { styles } from './CartStyle';
//import : modal
//import : redux
import { connect, useSelector } from 'react-redux';
import { dimensions } from 'global/Constants';
import Divider from 'component/Divider/Divider';
import MyButton from 'component/MyButton/MyButton';

import ViewAll from 'component/ViewAll/ViewAll';
import { createThumbnail } from 'react-native-create-thumbnail';
// import { setCartCount } from '../../../reduxToolkit/reducer/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_Endpoints} from 'global/Service';
import Item from 'component/Item/Item';
import { responsiveHeight as hg, responsiveFontSize } from 'react-native-responsive-dimensions';
import Background from 'assets/svgs/background.svg';
// import Item from '../../../components/Item/Item';
// import ShippingModal from '../../../modals/ShippingModal/ShippingModal';

const Cart = ({ navigation, dispatch }) => {
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
  const [cartListData, setCartListData] = useState({
  
});
{console.log('my cart list data--->',cartListData)}
  const [refreshing, setRefreshing] = useState(false);
  const [address, setAddress] = useState(null);
  const [coupon, setCoupon] = useState({
    applied: false,
    item: null,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [_currentProductId, _setCurrentProductId] = useState(null);
  const [allAppliedCoupons, setAllAppliedCoupons] = useState([]);

  useEffect(() => {
    getHome()
    // showAllAddressHandler();
  }, [coupon?.applied,focused]);
  const checkcon = () => {
    getCartList();
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

  const getHome = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token,'token')
      const {response, status} = await Service.getAPI(
        API_Endpoints.cartList,
        token,
      );
      {console.log('res of cart hhh===>', response?.data?.items)}
      if (status) {
        // const temp1 = resp?.data?.data?.items.filter(item => item.is_coupon_applied === true);
        // if (temp1?.length > 0) {
        //   const temp2 = temp1.map((item, index) => {
        //     const myCode = item?.coupons?.filter(e => e.code === item.coupon_code);
        //     return ({
        //       applied: true,
        //       item: { ...myCode[0], productId: item.product_id },
        //     });
        //   }
        //   );
        //   // console.log({temp2})
        //   setAllAppliedCoupons(temp2);
        }
        else {
        //   setAllAppliedCoupons([]);
        }
        // if (resp?.data?.data?.shippingAddressId) {
        //   const tempAddress = resp?.data?.address?.filter(item => item.id === resp.data.data.shippingAddressId?.address_id);
           
        //   if (tempAddress.length > 0) {
        //     setAddress(tempAddress);
        //   } else {
        //     setAddress([]);
        //   }
        // }
        // else if (!resp?.data?.data?.shippingAddressId) {
        //   setAddress([]);
        // }
        // after removing items getCartLit function is called again, checking if no items in data, then set cart count to 0
        // if (resp?.data?.data?.length === 0) {
        //   dispatch(setCartCount(resp?.data?.data?.length));
        //   await AsyncStorage.setItem(
        //     'cart_count',
        //     JSON.stringify(resp?.data?.data?.length),
        //   );
        // }
        // const doCoursesExists = resp?.data?.data?.items.find(el => el?.type == '1');
        // const doCoursesExists = resp?.data?.type === 1;
        // console.log("shoaib", resp?.data?.data?.items)
        // if (!doCoursesExists) {
          setCartListData(response?.data);
        // } else {
        //   // const data = await generateThumb(resp?.data?.data);
        //   // resp.data.data.items = [...resp?.data?.data];
        //   setCartListData(resp?.data);
        // }
      
    } catch (error) {
      console.error('error in getHome', error);
    }
  };
  const getCartList = async () => {
    setShowLoader(true);
    try {
      const resp = await Service.getApiWithToken(
        userToken,
        Service.CART_LIST,
      );
      if (!resp?.data?.status) {
        setCartListData({});
      }
      if (resp?.data?.status) {
        const temp1 = resp?.data?.data?.items.filter(item => item.is_coupon_applied === true);
        if (temp1?.length > 0) {
          const temp2 = temp1.map((item, index) => {
            const myCode = item?.coupons?.filter(e => e.code === item.coupon_code);
            return ({
              applied: true,
              item: { ...myCode[0], productId: item.product_id },
            });
          }
          );
          // console.log({temp2})
          setAllAppliedCoupons(temp2);
        }
        else {
          setAllAppliedCoupons([]);
        }
        if (resp?.data?.data?.shippingAddressId) {
          const tempAddress = resp?.data?.address?.filter(item => item.id === resp.data.data.shippingAddressId?.address_id);
           
          if (tempAddress.length > 0) {
            setAddress(tempAddress);
          } else {
            setAddress([]);
          }
        }
        else if (!resp?.data?.data?.shippingAddressId) {
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
        // console.log("shoaib", resp?.data?.data?.items)
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
    } catch (error) {
      console.log('error in getCartList', error);
    }
    setShowLoader(false);
  };
  // const generateThumb = async data => {
  //   let updatedData = [...data?.items];
  //   try {
  //     updatedData = await Promise.all(
  //       data?.items?.map?.(async el => {
  //         if (el?.type == '2') {
  //           return el;
  //         }
  //         // console.log('here', JSON.stringify(el));
  //         const thumb = await createThumbnail({
  //           url: el?.image,
  //           // url: `http://nileprojects.in/arkansas/public/upload/disclaimers-introduction/1695287295.mp4`,
  //           timeStamp: 1000,
  //         });
  //         return {
  //           ...el,
  //           thumb,
  //         };
  //       }),
  //     );
  //   } catch (error) {
  //     console.error('Error generating thumbnails:', error);
  //   }

  //   return updatedData;
  // };
  const gotoShippingScreen = () => {
    if (cartListData.type === 1) {
      navigation.navigate(ScreenNames.PROCEED_TO_PAYMENT);
    }
    else {
      if (address.length > 0) {
        navigation.navigate(ScreenNames.SHIPPING);
      }
      else {
        Toast.show({
          type: 'info',
          text1: 'Please choose an address',
        });
      }
    }
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

  const renderItem = ({ item }) => {
    console.log("Rendering item:", item);
  
    return (
      <Item
        item={item}
        type={cartListData.type}
        onChangeQuantity={() => {
          console.log("Quantity changed for:", item);
          getCartList();
        }}
        coupon={coupon}
        shownShippingBtn={cartListData.type === true}
        disabledBtn={cartListData.type === 1 ? false : true}
        shippingBtn={() => {
          console.log("Shipping button clicked for product ID:", item.product_id);
          modalHandler(item.product_id);
        }}
        shippingDetails={allAppliedCoupons}
      />
    );
  };
  
    
  
  const showAllAddress = () => {
    navigation.navigate(ScreenNames.ADDRESSESS);
  };
  console.log({ address })
  //UI
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Background style={StyleSheet.absoluteFill} />

        <Header
   
          showNotification={false}
          heading={'Shopping Cart'}
          showLearneLogo={false}
          showCart={false}
          showBackButton={true}></Header>
            {console.log('my view cartList====>>',cartListData?.items?.length)}
          {cartListData?.items?.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              {/* <Image source={require('assets/images/no-data.png')} /> */}
              <MyText
                text={'Your cart is empty'}
                fontFamily="medium"
                fontSize={40}
                textAlign="center"
                textColor={'black'}
              />
            </View>
          ) : (
            <View>
              <FlatList
                data={cartListData?.items}
                style={{}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
              {(cartListData?.items) ? 
            //   (cartListData.type === 1 ? 
              <>
                <ViewAll
                  text="Order Summary"
                  showSeeAll={false}
                  style={{ marginTop: 41,marginHorizontal:15 }}
                />
                {console.log('learni subtotal--->>>',cartListData?.subTotal)}
                <View style={[styles.summaryContainer,{width:dimensions.SCREEN_WIDTH*0.95,alignSelf:'center',borderWidth:1,borderColor:Colors.LIGHT_PURPLE,marginTop:14}]}>
                  <View style={[styles.row, { marginBottom: 10 }]}>
                    <MyText
                      text={`Subtotal (${cartListData?.items?.length > 0 ? cartListData?.items?.length : 0})`}
                      fontSize={16}
                      fontFamily="medium"
                      textColor={Colors.DARK_PURPLE}
                      style={{}}
                    />
                    <MyText
                      // text={`$${Number(cartListData?.sub_total).toFixed(2)}`}
                      text={cartListData?.subTotal ? ('$' + Number(cartListData?.subTotal)?.toFixed(2)) : ('$' + 0)}
                      fontSize={16}
                      fontFamily="medium"
                      textColor={Colors.DARK_PURPLE}
                      style={{}}
                    />
                  </View>
                  {/* <View style={[styles.row, { marginBottom: 10 }]}>
                    <MyText
                      text={`Discount`}
                      fontSize={14}
                      fontFamily="medium"
                      textColor={'#8F93A0'}
                      style={{}}
                    />
                    <MyText
                      // text={`$${Number(cartListData?.discount).toFixed(2)}`}
                      text={(cartListData?.data?.couponPrice > 0 ? `-$${Number(cartListData?.data?.couponPrice)?.toFixed(2)}` : '$' + 0)}
                      fontSize={14}
                      fontFamily="medium"
                      textColor={'#8F93A0'}
                      style={{}}
                    />
                  </View> */}
                 
                  <View style={[styles.row, { marginBottom: 19 }]}>
                    <MyText
                      text={`Tax`}
                      fontSize={14}
                      fontFamily="medium"
                      textColor={Colors.GREEN}
                      style={{}}
                    />
                    <MyText
                      // text={`$${Number(cartListData?.discount).toFixed(2)}`}
                      text={cartListData?.tax? ('$' + Number(cartListData?.tax)?.toFixed(2)) : ('$' + 0)}
                      fontSize={14}
                      fontFamily="medium"
                      textColor={Colors.GREEN}
                      style={{}}
                    />
                  </View>
                  {/* <View style={[styles.row, { marginBottom: 19 }]}>
                    <MyText
                      text={`Shipping`}
                      fontSize={14}
                      fontFamily="medium"
                      textColor={'#455A64'}
                      style={{}}
                    />
                    <MyText
                      text={`$${Number(cartListData?.shipping).toFixed(2)}`}
                      fontSize={14}
                      fontFamily="medium"
                      textColor={'#455A64'}
                      style={{}}
                    />
                  </View> */}
                  <Divider style={{ borderColor: '#E0E0E0' }} color={Colors.LIGHT_PURPLE}/>
                  <View style={[styles.row, { marginTop: 14 }]}>
                    <MyText
                      text={`Total`}
                      fontSize={18}
                      fontFamily="medium"
                      textColor={'#292D32'}
                      style={{}}
                    />
                    <MyText
                      // text={`$${Number(cartListData?.total).toFixed(2)}`}
                      text={cartListData?.totalPrice ? ('$' + Number(cartListData?.totalPrice)?.toFixed(2)) : ('$' + 0)}
                      fontSize={18}
                      fontFamily="medium"
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
                    alignSelf:'center'
                  }}
                  onPress={gotoShippingScreen}
                /></> 
                 
            //     <MyButton
            //     text={'Choose Shipping'}
            //     style={{
            //       width: width * 0.9,
            //       marginBottom: 10,
            //       backgroundColor: Colors.THEME_BROWN,
            //       marginTop: 32,
            //     }}
            //     onPress={gotoShippingScreen}
            //   />
            
              
              
              : <View style={{ marginTop: hg(5), height: hg(30), justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text style={{ color: 'black', fontSize: responsiveFontSize(3), fontWeight: '500' }}>
                  No item in cart!
                </Text>
              </View>}
            </View>
          )}
       
       </ScrollView>
      </SafeAreaView>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(Cart);