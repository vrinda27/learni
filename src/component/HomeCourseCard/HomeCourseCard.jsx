//import : react component
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';
//import : third party
import FastImage from 'react-native-fast-image';
//import : utils
import Like from 'assets/images/like.svg';
import Share from 'assets/images/share.svg';
import Rating from 'assets/images/rating.svg';
import Profile from 'assets/images/profilePerson.svg';
import {Colors} from 'global/index';
import {REGULAR} from 'global/Fonts';
import {dimensions} from 'global/Constants';
//import : styles
import {styles} from './HomeCourseCardStyle';
//import : modals
//import : redux

const HomeCourseCard = ({item, onPress = () => {}}) => {
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
          <Profile height={24} width={24}></Profile>
          <MyText
            text={'Jane Doe'}
            fontFamily={REGULAR}
            fontSize={13}
            textColor={Colors.BLACK}
            letterSpacing={0.13}
            style={{marginLeft: 10, top: 3}}
          />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Like></Like>
          <Share></Share>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCourseCard;
