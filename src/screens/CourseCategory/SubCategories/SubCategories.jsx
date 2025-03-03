//import : react component
import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import SearchWithIcon from 'component/SearchWithIcon/SearchWithIcon';
import SizeBox from 'component/SizeBox/SizeBox';
//import : third party
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import {API_Endpoints} from 'global/Service';
import {Colors, ScreenNames, Service} from 'global/index';
import RightSvg from 'assets/svgs/right-arrow.svg';
//import : styles
import {styles} from './SubCategoriesStyle';
//import : modals
//import : redux

const SubCategories = ({route, navigation}) => {
  //variables
  const {data} = route.params;
  //hook : states
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  //function : nav func
  const gotoCourseList = postData => {
    navigation.navigate(ScreenNames.COURSE_LIST, {data: postData});
  };
  //function : serv func
  const getSubCategories = async (name = '') => {
    try {
      const token = await AsyncStorage.getItem('token');
      const paramsData = {
        category_id: data.id,
        name: name,
      };
      const {response, status} = await Service.getAPI(
        API_Endpoints.subcategories,
        token,
        paramsData,
      );
      if (status) {
        setSubCategoriesData(response.data);
      }
    } catch (error) {
      console.error('error in getHome', error);
    }
  };
  //hook : useEffect
  useEffect(() => {
    getSubCategories();

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
            getSubCategories(text);
          }}
        />
        <SizeBox height={10} />
        <FlatList
          data={subCategoriesData}
          renderItem={({item, index}) => {
            return (
              <SubCategoriesCard
                name={item.name}
                onPress={() => gotoCourseList(item)}
              />
            );
          }}
          ItemSeparatorComponent={() => <SizeBox height={10} />}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    </View>
  );
};

export default SubCategories;

const SubCategoriesCard = ({name, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '98%',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        borderWidth: 1,
        borderColor: Colors.LIGHT_PURPLE,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      }}>
      <MyText text={name} fontSize={16} />
      <RightSvg />
    </TouchableOpacity>
  );
};
