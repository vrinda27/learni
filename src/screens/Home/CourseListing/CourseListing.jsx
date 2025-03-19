//import : react component
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
//import : custom components
import CourseCard from 'component/CourseCard/CourseCard';
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import SearchWithIcon from 'component/SearchWithIcon/SearchWithIcon';
import SizeBox from 'component/SizeBox/SizeBox';
import ListLoader from 'component/SkeltonLoader/ListLoader';
import Loader from 'component/loader/Loader';
//import : third party
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import Background from 'assets/svgs/background.svg';
import {API_Endpoints} from 'global/Service';
import {Colors, MyIcon, Service} from 'global/index';
//import : styles
import {styles} from './CourseListingStyle';
//import : modals
import CourseFilter from 'modals/CourseFilter/CourseFilter';
//import : redux

const CourseListing = ({navigation}) => {
  //variables
  const isFocused = useIsFocused();
  //hook : states
  const [coursesData, setCoursesData] = useState([]);
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  const [showBaseLoader, setShowBaseLoader] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [tempSearchedText, setTempSearchedText] = useState('');
  //variables : redux variables
  const gotoTrendingCourses = () => {
    // navigation.navigate(ScreenNames.TRENDING_COURSES);
  };
  //function : imp func
  const initLoader = async () => {
    setShowBaseLoader(true);
    await getCourses();
    setShowBaseLoader(false);
  };

  const searchHandle = text => {
    setTempSearchedText(text);
    const data = {
      name: text,
    };
  };
  //function : serv func
  const addToWishlist = async id => {
    try {
      setShowLoader(true);
      const postData = {
        id: id,
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
        getCourses();
      }
    } catch (err) {
      console.error('error in registering user', err);
    } finally {
      setShowLoader(false);
    }
  };
  const getCourses = async (data = {}) => {
    try {
      const paramsData = {
        highlow: data.highlow || '',
        ratings: data.ratings || '',
      };
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.courses,
        token,
        paramsData,
      );
      console.log('response', response);

      if (status) {
        setCoursesData(response?.data?.data);
      }
    } catch (error) {
      console.error('error in getCourses', error);
    }
  };
  //hook : useEffect
  useEffect(() => {
    initLoader();

    return () => {};
  }, [isFocused]);

  //UI
  if (showBaseLoader) {
    return <ListLoader />;
  } else {
    return (
      <View style={styles.container}>
        <Background style={StyleSheet.absoluteFill} />
        <Header
          showBackButton={true}
          showNotification={false}
          heading={'Trending Courses'}
          showCart={false}
          showGridIcon={false}
          showLearneLogo={false}
        />
        <FlatList
          data={coursesData || []}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <CourseCard
                item={item}
                heartPress={() => addToWishlist(item.id)}
                onPress={() => gotoCourseDetails(item.id)}
              />
            );
          }}
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
                value={tempSearchedText}
                disabled
                placeHolder={'Search by course or product name'}
                onChangeText={text => searchHandle(text)}
                icon={
                  <MyIcon.Ionicons
                    name="filter"
                    size={28}
                    color={Colors.WHITE}
                  />
                }
                onPress={() => setShowFilter(true)}
                placeholderTextColor={'#8F93A0'}
              />
            </View>
          )}
          ListFooterComponent={
            () =>
              coursesData.length === 0 ? (
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
        <SizeBox height={30} />
        <Loader visible={showLoader} />
        <CourseFilter
          visible={showFilter}
          setVisibility={setShowFilter}
          nextFunction={filterData => {
            getCourses(filterData);
          }}
        />
      </View>
    );
  }
};

export default CourseListing;
