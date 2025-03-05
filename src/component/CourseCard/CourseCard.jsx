//import : react component
import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';
//import : third party
import FastImage from 'react-native-fast-image';
//import : utils
import {REGULAR} from 'global/Fonts';
import Rating from 'assets/images/rating.svg';
import Profile from 'assets/images/profilePerson.svg';
import Lesson from 'assets/images/lesson.svg';
import Quiz from 'assets/images/quiz.svg';
import {BLACK, DARK_PURPLE} from 'global/Color';
//import : styles
import {styles} from './CourseCardStyle';
import {Colors, MyIcon} from 'global/index';
//import : modals
//import : redux

const CourseCard = ({item, onPress = () => {}, heartPress = () => {}}) => {
  console.log(item);

  //UI
  return (
    <TouchableOpacity onPress={onPress} style={styles.courseContainer}>
      <View style={styles.topRow}>
        <View style={styles.topLeftRow}>
          {item.creator_profile ? (
            <Image
              source={{uri: item.creator_profile}}
              style={{
                height: 48,
                width: 48,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: Colors.YELLOW,
              }}
            />
          ) : (
            <Profile height={48} width={48} />
          )}

          <MyText
            text={item.creator_name}
            fontFamily={REGULAR}
            numberOfLines={1}
            fontSize={14}
            textColor={BLACK}
            letterSpacing={0.13}
            style={{marginLeft: 10, width: '60%'}}
          />
        </View>
        <View style={styles.topRightRow}>
          <TouchableOpacity
            onPress={() => {
              heartPress();
            }}>
            <MyIcon.Ionicons
              name={item.wishlist ? 'heart' : 'heart-outline'}
              size={26}
              color={Colors.PINK}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              shareHandler(item?.id);
            }}>
            <MyIcon.AntDesign name="sharealt" size={26} color={Colors.GREEN} />
          </TouchableOpacity>
        </View>
      </View>
      {item.image != null ? (
        <FastImage
          resizeMode="contain"
          source={{uri: item.image}}
          style={styles.crseImg}>
          <TouchableOpacity
            onPress={() => {
              setShowModal({
                isVisible: true,
                data: item,
              });
            }}>
            {/* <Image source={require('assets/images/play-icon.png')} /> */}
          </TouchableOpacity>
        </FastImage>
      ) : null}
      <View style={styles.bottomRow}>
        <View style={{width: '100%'}}>
          <MyText
            text={item.name}
            fontFamily={BLACK}
            fontSize={16}
            textColor={BLACK}
            style={{}}
          />
          <View style={styles.courseNameView}>
            <View style={{flexDirection: 'row'}}>
              <MyText
                text={'$'}
                fontFamily={BLACK}
                fontSize={20}
                textColor={BLACK}
                style={{}}
              />
              <MyText
                text={item.course_fee}
                fontFamily={BLACK}
                fontSize={20}
                textColor={DARK_PURPLE}
                style={{}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: 5,
              }}>
              <Rating />
              <MyText
                text={item.rating}
                fontFamily={BLACK}
                fontSize={13}
                textColor={BLACK}
                style={{}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: 5,
              }}>
              <Lesson />
              <MyText
                text={`${item.lesson_count} Lesson`}
                fontFamily={BLACK}
                fontSize={13}
                textColor={BLACK}
                style={{}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Quiz></Quiz>
              <MyText
                text={'15 Quiz'}
                fontFamily={BLACK}
                fontSize={13}
                textColor={BLACK}
                style={{}}
              />
            </View>
          </View>
        </View>
        <View style={styles.bottomRight}>
          <View
            style={{
              height: 10,
              width: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
          <MyText
            text={item.rating}
            fontFamily="regular"
            fontSize={13}
            textColor={'gray'}
            letterSpacing={0.13}
            style={{marginLeft: 10}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseCard;
