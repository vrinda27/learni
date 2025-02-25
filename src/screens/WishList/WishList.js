//react components
import React, {useEffect} from 'react';
import {
  View,
  Image,
  Platform,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
//global
import Header from '../../component/Header/Header';
import FastImage from 'react-native-fast-image';
//styles

import Background from 'assets/svgs/background.svg';
import Logo from 'assets/svgs/logoLearne.svg';
import MySearchBarForHome from '../../component/MySearchBarForHome';
import {LIGHT_PURPLE, WHITE} from '../../global/Color';
import {dimensions} from '../../global/Constants';
import {SvgUri} from 'react-native-svg';
import {DARK_GREY, BLACK, GREEN, DARK_PURPLE,LIGHT_GRAY} from '../../global/Color';
import MyText from '../../component/MyText/MyText';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {REGULAR} from '../../global/Fonts';
import SearchWithIcon from '../../component/SearchWithIcon/SearchWithIcon';
///svg images
import Like from 'assets/images/heartActive.svg';
import Share from 'assets/images/share.svg';
import Rating from 'assets/images/rating.svg';
import Profile from 'assets/images/profilePerson.svg';
import Lesson from 'assets/images/lesson.svg';
import Quiz from 'assets/images/quiz.svg';
import {ScrollView} from 'react-native-gesture-handler';
const WishList = ({navigation}) => {
  //variables : redux variables
  const category = [
    {
      id: '1',
      title: 'Development',
      image: require('assets/images/category1.png'),
    },
    {
      id: '2',
      title: 'Business',
      image: require('assets/images/category2.png'),
    },
    {
      id: '3',
      title: 'Finance & Accounting',
      image: require('assets/images/category3.png'),
    },
    {
      id: '4',
      title: 'Finance & Accounting',
      image: require('assets/images/category3.png'),
    },
  ];
  const trending = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      price: '$599',
      rating: '4.7',
      name: 'Jane Doe',
      image: require('assets/images/trending1.png'),
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
      price: '$599',
      rating: '4.7',
      name: 'Jane Doe',
      image: require('assets/images/trending2.png'),
    },
  ];
  const renderItem = ({item}) => (
    <View style={styles.categoryContainer}>
      <Image source={item.image} style={styles.categoryImg}></Image>
      <MyText
        text={item?.title}
        textColor={DARK_GREY}
        fontSize={13}
        fontFamily="medium"
        style={{
          marginTop: 5,
          alignSelf: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          textAlign: 'center',
        }}
      />
    </View>
  );
  const gotoTrendingCourses = () => {
    // navigation.navigate(ScreenNames.TRENDING_COURSES);
  };

  ///trending course ui
  const renderCourse = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => gotoCourseDetails(item?.id, '1')}
        style={styles.courseContainer}>
        <View style={styles.topRow}>
          <View style={styles.topLeftRow}>
            <Profile height={48} width={48}></Profile>
            <MyText
              text={'Jane Doe'}
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
              style={{
                height: 18,
                width: 18,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                onLike('1', item.id, item?.isWishlist);
              }}>
              <Like></Like>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 18,
                width: 18,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 12,
              }}
              onPress={() => {
                shareHandler(item?.id);
              }}>
              {/* <Image
                source={require('assets/images/share.png')}
                style={{ marginLeft: 10 }}
              /> */}
              <Share></Share>
            </TouchableOpacity>
          </View>
        </View>
        {item?.image != null ? (
          <FastImage
            source={require('assets/images/wishlist.png')}
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
              text={item.title}
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
                  text={'599'}
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
                }}>
                <Rating></Rating>
                <MyText
                  text={'4.7'}
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
                <Lesson></Lesson>
                <MyText
                  text={'15 Lesson'}
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
              }}>
              {/* <Image resizeMode='contain' source={require('assets/images/star.png')} style={{height:12,minWidth:12}} /> */}
            </View>
            <MyText
              text={item?.avg_rating}
              fontFamily="regular"
              fontSize={13}
              textColor={'gray'}
              letterSpacing={0.13}
              style={{marginLeft: 10}}
            />
          </View>
        </View>
        {/* <MyText
          text={item.name}
          fontFamily="regular"
          fontSize={14}
          textColor={'black'}
        /> */}
      </TouchableOpacity>
    );
  };
  //UI
  return (
    <SafeAreaView style={{flex: 1}}>
      <Background style={StyleSheet.absoluteFill} />
      <Header
        showBackButton={false}
        showNotification={true}
        showGridIcon={true}
      />

      <FlatList
        data={trending || []}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCourse}
        onEndReachedThreshold={0.1}
        nestedScrollEnabled={true} // Allows inner scrolling
        contentContainerStyle={{
          paddingHorizontal: 16, // Equal left-right padding
          paddingBottom: 50, // Ensure enough space to scroll to bottom
          flexGrow: 1, // Ensures FlatList takes full height
        }}
        ListHeaderComponent={() => (
          <View style={{marginVertical: 12}}>
            <SearchWithIcon
              disabled
              placeHolder={'Search by course or product name'}
              placeholderTextColor={'#8F93A0'}
            />
          </View>
        )}
        ListFooterComponent={() =>
          trending.length === 0 ? (
            <MyText
              text={`No Trending Courses found`}
              fontFamily="medium"
              fontSize={18}
              textColor={'#455A64'}
              style={{textAlign: 'center', marginTop: 20}}
            />
          ) : (
            <View style={{height: 20}} />
          ) // Empty space for better scrolling
        }
      />
    </SafeAreaView>
  );
};

export default WishList;
const styles = StyleSheet.create({
  categoryContainer: {
    height: 'auto',
    width: dimensions.SCREEN_WIDTH * 0.27,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: LIGHT_PURPLE,
    borderWidth: 1,
    marginRight: 8,
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  categoryImg: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  allButton: {
    width: 63,
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
  },
  trendingTxt: {
    marginTop: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  courseContainer: {
    width: dimensions.SCREEN_WIDTH * 0.9,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    marginRight: 16,
    // shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.05,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderColor:'#E0E0E0',
    marginVertical:8
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 5,
    gap: 20,
    marginVertical: 15,
  },
  topLeftRow: {
    // backgroundColor:'blue',
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  crtrImg: {
    width: dimensions.SCREEN_WIDTH * 0.9,
    height: 196,
    borderRadius: responsiveHeight(3),
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 5,
    paddingVertical: 4,
  },
  courseNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: dimensions.SCREEN_WIDTH * 0.8,
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 5,
  },
  topRightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    // backgroundColor:'red',
    width: 45,
    left: -10,
  },
  crseImg: {
    height: 167,
    width: dimensions.SCREEN_WIDTH * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
