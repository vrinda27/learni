//import : react components
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import : custom components
import Header from 'component/Header/Header';
import ViewAll from 'component/ViewAll/ViewAll';
import MySearchBarForHome from 'component/MySearchBarForHome';
import MyText from 'component/MyText/MyText';
//import : third parties
import FastImage from 'react-native-fast-image';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import Background from 'assets/svgs/background.svg';
import Like from 'assets/images/like.svg';
import Share from 'assets/images/share.svg';
import Rating from 'assets/images/rating.svg';
import Profile from 'assets/images/profilePerson.svg';
import {REGULAR} from 'global/Fonts';
import {dimensions} from 'global/Constants';
import {Colors, ScreenNames, Service} from 'global/index';
import {API_Endpoints} from 'global/Service';

const Home = ({navigation}) => {
  //hook : states
  const [homeData, setHomeData] = useState({
    categories: [],
    courses: [],
    products: [],
    sub_categories: [],
  });
  //function : nav func
  const gotoCourseCategory = () => {
    navigation.navigate(ScreenNames.COURSE_CATEGORY);
  };
  const gotoCourseDetails = id => {
    navigation.navigate(ScreenNames.COURSE_DETAIL, {id});
  };
  //variables : redux variables
  const renderItem = ({item}) => {
    return (
      <View style={styles.categoryContainer}>
        <Image source={{uri: item.image}} style={styles.categoryImg}></Image>
        <MyText
          text={item?.name}
          textColor={Colors.DARK_GREY}
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
  };
  const gotoTrendingCourses = () => {
    // navigation.navigate(ScreenNames.TRENDING_COURSES);
  };

  ///trending course ui
  const renderCourse = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => gotoCourseDetails(item.id)}
        style={styles.courseContainer}>
        {item?.image != null ? (
          <FastImage source={{uri: item?.image}} style={styles.crseImg}>
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
  //function : serv func
  const getHome = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.home,
        token,
      );
      if (status) {
        setHomeData({
          categories: response?.data?.category,
          courses: response?.data?.course,
          products: response?.data?.product,
          sub_categories: response?.data?.subCategory,
        });
      }
    } catch (error) {
      console.error('error in getHome', error);
    }
  };
  //hook : useEffect
  useEffect(() => {
    getHome();
  }, []);
  //UI
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Background style={StyleSheet.absoluteFill} />

        <Header
          showBackButton={false}
          showNotification={true}
          showGridIcon={true}></Header>

        <View style={{marginHorizontal: 12}}>
          <View style={{marginVertical: 12}}>
            <MySearchBarForHome
              disabled
              placeHolder={'Search by course or product name'}
            />
            <View style={{width: dimensions.SCREEN_WIDTH * 0.93}}>
              <ViewAll
                text="Courses Category"
                onPress={() => gotoCourseCategory()}
                style={{marginTop: 25}}
              />
              <FlatList
                data={homeData?.categories}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
                renderItem={renderItem}
                contentContainerStyle={{paddingLeft: 20, paddingVertical: 10}}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          <View>
            {homeData?.courses?.length > 0 ? (
              <View>
                <ViewAll
                  text="Trending Courses"
                  onPress={gotoTrendingCourses}
                  style={{marginTop: 4}}
                />
                <FlatList
                  data={homeData?.courses || []}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{marginTop: 15}}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderCourse}
                  onEndReached={''}
                  onEndReachedThreshold={0.1}
                  ListFooterComponent={''}
                />
              </View>
            ) : (
              <MyText
                text={`No Trending Courses found`}
                fontFamily="medium"
                fontSize={18}
                textColor={'#455A64'}
                style={{textAlign: 'center', marginTop: 20}}
              />
            )}
          </View>
          <View>
            {homeData?.courses?.length > 0 ? (
              <View>
                <ViewAll
                  text="Suggested Courses"
                  onPress={gotoTrendingCourses}
                  style={{marginTop: 25}}
                />
                <FlatList
                  data={homeData?.courses || []}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{marginTop: 15}}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderCourse}
                  onEndReached={''}
                  onEndReachedThreshold={0.1}
                  ListFooterComponent={''}
                />
              </View>
            ) : (
              <MyText
                text={`No Trending Courses found`}
                fontFamily="medium"
                fontSize={18}
                textColor={'#455A64'}
                style={{textAlign: 'center', marginTop: 20}}
              />
            )}
          </View>
        </View>
        <View height={dimensions.SCREEN_HEIGHT * 0.2}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  categoryContainer: {
    height: 'auto',
    width: dimensions.SCREEN_WIDTH * 0.27,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: Colors.LIGHT_PURPLE,
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
    backgroundColor: Colors.GREEN,
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
    width: (dimensions.SCREEN_WIDTH - 40) * 0.66,

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
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 5,
    gap: 20,
  },
  topLeftRow: {
    // backgroundColor:'blue',
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  crtrImg: {
    width: (dimensions.SCREEN_WIDTH - 40) * 0.64,
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
    width: (dimensions.SCREEN_WIDTH - 40) * 0.65,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
