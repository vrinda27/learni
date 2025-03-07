//import : react component
import React, {useEffect, useState} from 'react';
import {FlatList, View,ScrollView,SafeAreaView,StyleSheet} from 'react-native';
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
import Background from 'assets/svgs/background.svg';
import Filter from 'assets/images/settingFilter.svg';
import TrendingFiltersModal from 'component/SearchWithIcon/Component/CategoryFilter';
//import : modals
//import : redux

const CourseList = ({route, navigation}) => {
  //variables
  const {data} = route.params;
  //hook : states
  const [coursesData, setCoursesData] = useState([]);
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
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
    <SafeAreaView style={{flex: 1,backgroundColor:'white'}}>
      <ScrollView>
        <Background style={StyleSheet.absoluteFill} />

        <Header
          showNotification={true}
          heading={data.name}
          showLearneLogo={false}
          showCart={false}
          showBackButton={true}></Header>
    <View style={styles.container}
    onPress={()=>setShowFilterModal(true)}>
      
      <View style={styles.mainView}>
      <SearchWithIcon 
  placeholder="Search here..."
  value={''}
  onChangeText={''}
  icon={<Filter></Filter>
    
  } // Custom icon passed
  onPress={()=>setShowFilterModal(true)}
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
      <TrendingFiltersModal
          visible={showFilterModal}
          setVisibility={setShowFilterModal}
          courseCategries={[]}
          tempSelectedCourseCategries={''}
          setTempSelectedCourseCategries={''}
          priceFilterValues={[]}
          tempSelectedPriceFilter={''}
          setTempSelectedPriceFilter={''}
          tempSelectedRatingValues={''}
          setTempSelectedRatingValues={''}
          applyFilters={()=>{applyFilters();setApplyCheck(true)}}
          resetFilter={''}
        />
      <Loader visible={showLoader} />
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default CourseList;
