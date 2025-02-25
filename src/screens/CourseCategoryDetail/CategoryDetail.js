//import : react components
import React, {useEffect, useRef, useState, useSelector} from 'react';
import {
  View,
  ScrollView,
  Switch,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  StyleSheet,
} from 'react-native';
//import : custom components
import Header from '../../component/Header/Header';
import MyText from '../../component/MyText/MyText';
// import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties
// import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
//import : global
// import {Colors, Constant, MyIcon, ScreenNames, Service} from 'global/Index';
//import : styles
import {styles} from './CategoryDetailStyle';
//import : modal
//import : redux
// import {connect, useSelector} from 'react-redux';
import {width, height} from 'global/Constant';
// import Divider from 'components/Divider/Divider';
// import MyButton from '../../../components/MyButton/MyButton';
import SearchWithIcon from '../../component/SearchWithIcon/SearchWithIcon';
import Background from '../../assests/images/background.svg';
import Arrow from '../../assests/images/categoryArrow.svg';
import {BLACK, REGULAR} from '../../global/Fonts';
import {dimensions} from '../../global/Constants';
import {CYAN, DARK_PURPLE, GREEN, YELLOW} from '../../global/Color';

const CategoryDetail = ({navigation, dispatch, route}) => {
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  // const userToken = useSelector(state => state.user.userToken);
  // const userInfo = useSelector(state => state.user.userInfo);
  const [showLoader, setShowLoader] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [categoriesData, setCategoriesData] = useState([]);
  const [filteredcategoryData, setFilteredcategoryData] = useState([
    {
      id: '1',
      title: 'Business',
      image: require('../../assests/images/buisness.png'),
    },
    {
      id: '2',
      title: 'Lifestyle',
      image: require('../../assests/images/lifestye.png'),
    },
    {
      id: '3',
      title: 'Marketing',
      image: require('../../assests/images/marketing.png'),
    },
    {
      id: '4',
      title: 'Design',
      image: require('../../assests/images/buisness.png'),
    },
  ]);
  const [refreshing, setRefreshing] = useState(false);
  const focused = useIsFocused();

  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setSearchValue('');
      getCategories();
    });
    return unsubscribe;
  }, [navigation, focused]);
  const checkcon = () => {
    getCategories();
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    checkcon();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);
  const getCategories = async () => {
    setShowLoader(true);
    try {
      const resp = await Service.getApiWithToken(
        userToken,
        Service.ALL_CATEGORY + `?type=${route?.params?.typeParam}`,
      );
      if (resp?.data?.status) {
        setCategoriesData(resp?.data?.data);
        setFilteredcategoryData(resp?.data?.data);
      } else {
        Toast.show({text1: resp.data.message});
      }
    } catch (error) {
      console.error('error in getCategories', error);
    }
    setShowLoader(false);
  };
  const gotoSearch = id => {
    if (route?.params?.typeParam == '1') {
      gotoSearchCourseByCategory(id);
    } else {
      gotoSearchProductByCategory(id);
    }
  };
  const gotoSearchCourseByCategory = id => {
    navigation.navigate(ScreenNames.SEARCH_COURSE_BY_CATEGORY, {id});
  };
  const gotoSearchProductByCategory = id => {
    navigation.navigate(ScreenNames.SEARCH_PRODUCT_BY_CATEGORY, {id});
  };

  const renderCategory = ({item}) => {
    return (
      <TouchableOpacity
        // onPress={() => gotoSearch(item?.id)}
        onPress={() => {
          navigation.navigate('CourseDetail');
        }}
        style={styles.categoryContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: dimensions.SCREEN_WIDTH * 0.84,
            paddingVertical: 8,
          }}>
          <MyText
            text={item.title}
            fontFamily={REGULAR}
            fontSize={14}
            textAlign="center"
            textColor={
              item.id === '1'
                ? GREEN
                : item.id === '2'
                ? CYAN
                : item.id === '3'
                ? YELLOW
                : DARK_PURPLE
            }
            style={{marginTop: 5}}
          />
          <Arrow height={38} width={38}></Arrow>
          {/* <Image source={require('../../assests/images/categoryArrow.svg')} style={styles.catImg}></Image> */}
        </View>
      </TouchableOpacity>
    );
  };
  const filterCategoriesByName = text => {
    const data = categoriesData?.filter(el => {
      const formattedCategoryName = el.category_name
        ?.toString()
        ?.trim()
        ?.toLowerCase();
      const formattedText = text?.toString()?.trim()?.toLowerCase();
      if (formattedCategoryName?.includes(formattedText)) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredcategoryData([...data]);
  };
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
            {/* <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '20%'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.mainView}> */}
            <SearchWithIcon
              value={searchValue}
              setValue={setSearchValue}
              //   icon={

              //   <Image source={require('assets/images/yellow-seach.png')} />

              // }
              placeholder="Search Category"
              onChangeText={text => {
                setSearchValue(text);
                filterCategoriesByName(text);
              }}
              // style={{
              //   width: Constant.width - 40,
              //   alignSelf: 'center',
              //   marginTop: -25,
              // }}
            />
            {filteredcategoryData?.length > 0 ? (
              <FlatList
                data={filteredcategoryData}
                //   numColumns={3}
                style={{marginTop: 37}}
                //   keyExtractor={(item, index) => index.toString()}
                renderItem={renderCategory}
              />
            ) : (
              <View style={{alignItems: 'center', marginTop: 20}}>
                {/* <Image source={require('assets/images/no-data.png')} /> */}
                <MyText
                  text={'No data found!'}
                  fontFamily="medium"
                  fontSize={40}
                  textAlign="center"
                  textColor={'black'}
                />
              </View>
            )}
            {/* </ScrollView> */}
            {/* <CustomLoader showLoader={showLoader} /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const mapDispatchToProps = dispatch => ({
  dispatch,
});
// export default connect(null, mapDispatchToProps)(CourseCategory);
export default CategoryDetail;
