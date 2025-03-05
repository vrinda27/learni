//import : react component
import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';
//import : third party
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
//import : utils
import Share from 'assets/images/share.svg';
import Rating from 'assets/images/rating.svg';
import {Colors, MyIcon, Service} from 'global/index';
import {REGULAR} from 'global/Fonts';
import {dimensions} from 'global/Constants';
//import : styles
import {styles} from './HomeCourseCardStyle';
import {API_Endpoints} from 'global/Service';
//import : modals
//import : redux

const HomeCourseCard = ({
  item,
  setShowLoader = () => {},
  onPress = () => {},
  nextFunction = () => {},
}) => {
  //hook : states
  //function : serv function
  const addToWishlist = async () => {
    try {
      setShowLoader(true);
      const postData = {
        id: item.id,
        type: 1,
      };
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.postAPI(
        API_Endpoints.add_wishlist,
        postData,
        token,
      );
      if (status) {
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        nextFunction();
      }
    } catch (err) {
      console.error('error in registering user', err);
    } finally {
      setShowLoader(false);
    }
  };
  //UI
  return (
    <TouchableOpacity onPress={onPress} style={styles.courseContainer}>
      {item?.image != null ? (
        <FastImage
          resizeMode="contain"
          source={{uri: item?.image}}
          style={styles.crseImg}>
          <TouchableOpacity
            onPress={() => {
              setShowModal({
                isVisible: true,
                data: item,
              });
            }}></TouchableOpacity>
        </FastImage>
      ) : null}
      <View style={styles.bottomRow}>
        <View style={{width: dimensions.SCREEN_WIDTH * 0.56}}>
          <MyText
            text={item.name}
            fontFamily={'regular'}
            fontSize={16}
            textColor={Colors.BLACK}
            style={{}}
          />
          <View
            style={[
              styles.courseNameView,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: dimensions.SCREEN_WIDTH * 0.3,
                marginVertical: 4,
              },
            ]}>
            <View style={{flexDirection: 'row'}}>
              <MyText
                text={'$'}
                fontFamily={REGULAR}
                fontSize={20}
                textColor={Colors.BLACK}
                letterSpacing={0.14}
                style={{}}
              />
              <MyText
                text={item.course_fee}
                fontFamily={REGULAR}
                fontSize={20}
                textColor={Colors.DARK_PURPLE}
                letterSpacing={0.14}
                style={{}}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Rating style={{}}></Rating>
              <MyText
                text={item.rating}
                fontFamily={REGULAR}
                fontSize={13}
                textColor={Colors.DARK_PURPLE}
                letterSpacing={0.14}
                style={{marginLeft: 3}}
              />
            </View>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.bottomRight,
          {
            marginBottom: 9,
            justifyContent: 'space-between',
            width: '96%',
            alignSelf: 'center',
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: item.creator_profile}}
            style={{
              height: 30,
              width: 30,
              borderRadius: 100,
            }}
          />
          <MyText
            text={item.creator_name}
            fontFamily={REGULAR}
            fontSize={13}
            textColor={Colors.BLACK}
            letterSpacing={0.13}
            style={{marginLeft: 10, top: 3}}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              addToWishlist();
            }}>
            <MyIcon.Ionicons
              name={item.wishlist ? 'heart' : 'heart-outline'}
              size={26}
              color={Colors.PINK}
            />
          </TouchableOpacity>
          <Share></Share>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCourseCard;
