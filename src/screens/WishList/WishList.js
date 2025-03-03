//import : react component
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
//import : custom components
import CourseCard from 'component/CourseCard/CourseCard';
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import SearchWithIcon from 'component/SearchWithIcon/SearchWithIcon';
//import : third party
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import Background from 'assets/svgs/background.svg';
import {API_Endpoints} from 'global/Service';
import {Service} from 'global/index';
import SizeBox from 'component/SizeBox/SizeBox';
//import : styles
//import : modals
//import : redux

const WishList = ({navigation}) => {
  //variables
  const isFocused = useIsFocused();
  //hook : states
  const [wishlistData, setWishlistData] = useState([]);
  //variables : redux variables
  const gotoTrendingCourses = () => {
    // navigation.navigate(ScreenNames.TRENDING_COURSES);
  };
  //function : serv func
  const getWishlist = async () => {
    try {
      const paramsData = {
        type: 1,
      };
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.getAPI(
        API_Endpoints.wishlist,
        token,
        paramsData,
      );
      if (status) {
        setWishlistData(response.data);
      }
    } catch (error) {
      console.error('error in getWishlist', error);
    }
  };
  //hook : useEffect
  useEffect(() => {
    getWishlist();

    return () => {};
  }, [isFocused]);

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
        data={wishlistData || []}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          console.log('jhgyug', item);

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
              disabled
              placeHolder={'Search by course or product name'}
              placeholderTextColor={'#8F93A0'}
            />
          </View>
        )}
        ListFooterComponent={
          () =>
            wishlistData.length === 0 ? (
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
    </SafeAreaView>
  );
};

export default WishList;
