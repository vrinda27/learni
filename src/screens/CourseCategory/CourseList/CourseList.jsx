//import : react component
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
import SearchWithIcon from 'component/SearchWithIcon/SearchWithIcon';
//import : third party
//import : utils
//import : styles
import {styles} from './CourseListStyle';
import SizeBox from 'component/SizeBox/SizeBox';
import CourseCard from 'component/CourseCard/CourseCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenNames, Service} from 'global/index';
import {API_Endpoints} from 'global/Service';
import Loader from 'component/loader/Loader';
import Toast from 'react-native-toast-message';
//import : modals
//import : redux

const CourseList = ({route, navigation}) => {
  //variables
  const {data} = route.params;
  //hook : states
  const [coursesData, setCoursesData] = useState([]);
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  //function : nav func
  const gotoCourseDetails = id => {
    navigation.navigate(ScreenNames.COURSE_DETAIL, {id});
  };
  //function : imp func
  const initLoader = async () => {
    setShowLoader(true);
    await getCouseList();
    setShowLoader(false);
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
        getCouseList();
      }
    } catch (err) {
      console.error('error in registering user', err);
    } finally {
      setShowLoader(false);
    }
  };
  const getCouseList = async (searchedName = '') => {
    try {
      const paramsData = {
        name: searchedName,
        sub_category_id: data.id,
      };
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.courses,
        token,
        paramsData,
      );
      if (status) {
        setCoursesData(response.data);
      }
    } catch (error) {
      console.error('error in getHome', error);
    }
  };
  //hook : useEffect
  useEffect(() => {
    initLoader();

    return () => {};
  }, []);

  //UI
  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        heading={data.name}
        showNotification={true}
        showCart={false}
        showLearneLogo={false}
        showGridIcon={false}
      />
      <View style={styles.mainView}>
        <SearchWithIcon
          placeholder="Search by name"
          onChangeText={text => {
            getCouseList(text);
          }}
        />
        <SizeBox height={10} />
        <FlatList
          data={coursesData}
          contentContainerStyle={{
            paddingBottom: '50%',
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <CourseCard
                item={item}
                image={item.image}
                heartPress={() => addToWishlist(item.id)}
                onPress={() => gotoCourseDetails(item.id)}
              />
            );
          }}
          ItemSeparatorComponent={() => <SizeBox height={10} />}
          keyExtractor={(item, index) => item + index}
        />
      </View>
      <Loader visible={showLoader} />
    </View>
  );
};

export default CourseList;
