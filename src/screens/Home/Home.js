//import : react components
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
// import : custom components
import Header from 'component/Header/Header';
import ViewAll from 'component/ViewAll/ViewAll';
import MySearchBarForHome from 'component/MySearchBarForHome';
import MyText from 'component/MyText/MyText';
import HomeCourseCard from 'component/HomeCourseCard/HomeCourseCard';
import CategoryCard from 'component/CategoryCard/CategoryCard';
//import : third parties
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import Background from 'assets/svgs/background.svg';
import {dimensions} from 'global/Constants';
import {ScreenNames, Service} from 'global/index';
import {API_Endpoints} from 'global/Service';

const Home = ({navigation}) => {
  //hook : states
  console.log('reached home screem')
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
  const gotoSubCategories = data => {
    navigation.navigate(ScreenNames.SUB_CATEGORY, {data});
  };
  const gotoCourseDetails = id => {
    navigation.navigate(ScreenNames.COURSE_DETAIL, {id});
  };
  const gotoTrendingCourses = () => {
    // navigation.navigate(ScreenNames.TRENDING_COURSES);
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
                renderItem={({item}) => (
                  <CategoryCard
                    item={item}
                    onPress={() => gotoSubCategories(item)}
                  />
                )}
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
                  renderItem={({item}) => (
                    <HomeCourseCard
                      item={item}
                      onPress={() => gotoCourseDetails(item.id)}
                    />
                  )}
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
                  renderItem={({item}) => (
                    <HomeCourseCard
                      item={item}
                      onPress={() => gotoCourseDetails(item.id)}
                    />
                  )}
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
