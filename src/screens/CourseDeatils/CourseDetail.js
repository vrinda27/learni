//import : react components
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import ViewAll from 'component/ViewAll/ViewAll';
import MyButton from 'component/MyButton/MyButton';
import Divider from 'component/Divider/Divider';
//import : third parties
import Video from 'react-native-video';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import Background from 'assets/svgs/background.svg';
import Calendar from 'assets/images/calendar.svg';
import Rating from 'assets/images/rating.svg';
import Profile from 'assets/images/profilePerson.svg';
import Chapter from 'assets/images/chapter.svg';
import Quiz from 'assets/images/quizQues.svg';
import Pdf from 'assets/images/pdfDocument.svg';
import Clock from 'assets/images/clockGreen.svg';
import {dimensions} from 'global/Constants';
import {BLACK, EXTRA_BOLD, REGULAR} from 'global/Fonts';
import {DARK_PURPLE, YELLOW} from 'global/Color';
//import : styles
import {styles} from './CourseDetailStyle';
//import : modal
import Review from 'modals/Review/Review';
import {Service} from 'global/index';
import {API_Endpoints} from 'global/Service';

const CourseDetail = ({navigation, dispatch, route}) => {
  // variables : ref
  const reviewRef = useRef();
  const {id} = route?.params;
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const [courseData, setCourseData] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [selectedTag, setSelectedTag] = useState('1');
  const [reviewbutton, setReviewbutton] = useState('false');
  const [review, setReview] = useState('');
  const [starRating, setStarRating] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const tags = [
    {
      id: '1',
      title: 'Course Tag',
    },
    {
      id: '2',
      title: 'Course Tag',
    },
    {
      id: '3',
      title: 'Course Tag',
    },
  ];

  const reviewAll = [
    {
      id: 1,
      name: 'Robert Fox',
    },
    {id: '2', name: 'Albert Flores'},
    {id: '3', name: 'Bessie Cooper'},
  ];

  const changeSelectedTag = id => {
    setSelectedTag(id);
  };

  const renderTags = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => changeSelectedTag(item.id)}
        style={[
          styles.courseTypeContainer,
          item?.id === '1'
            ? {backgroundColor: '#FF8615'}
            : item?.id === '2'
            ? {backgroundColor: '#00B44B'}
            : {backgroundColor: '#00FEFF'},
        ]}>
        <MyText
          text={item?.title}
          fontFamily="regular"
          fontSize={14}
          textColor={selectedTag === item.id ? 'white' : 'white'}
        />
      </TouchableOpacity>
    );
  };

  const renderChapter = ({item}) => {
    return (
      <TouchableOpacity
        // onPress={() => changeSelectedTag(item.id)}
        onPress={() => navigation.navigate('Disclaimers')}
        style={[
          styles.chapterContainer,
          // item?.id === '1'
          //   ? {backgroundColor: '#FF8615'}
          //   : item?.id === '2'
          //   ? {backgroundColor: '#00B44B'}
          //   : {backgroundColor: '#00FEFF'},
        ]}>
        <View
          style={[
            styles.chapterContainerow,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: dimensions.SCREEN_WIDTH * 0.87,
              marginTop: 14,
            },
          ]}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.serialContainer}>
              <MyText
                text={item?.id}
                fontFamily={BLACK}
                fontSize={13}
                textColor={'white'}
              />
            </View>

            <View style={styles.chapterTitleView}>
              <MyText
                text={item.lesson_name}
                fontFamily={BLACK}
                fontSize={13}
                textColor={DARK_PURPLE}
              />
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Clock />
            <MyText
              text={'10min'}
              fontFamily={BLACK}
              fontSize={12}
              textColor={'#999999'}
              style={{textAlign: 'center', marginLeft: 5}}
            />
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pdf />
            <MyText
              text={'PDF'}
              fontFamily={BLACK}
              fontSize={12}
              textColor={'#999999'}
              style={{textAlign: 'center', marginLeft: 5}}
            />
          </View>
        </View>
        <MyText
          text={
            'Lorem ipsum dolor sit amet, dolor is consectetur adipiscing elit.'
          }
          fontFamily={REGULAR}
          fontSize={13}
          textColor={'black'}
          style={{width: '95%', marginHorizontal: 16, marginTop: 7}}
        />
      </TouchableOpacity>
    );
  };

  const submitReview = async () => {
    if (review?.trim()?.length === 0) {
      Toast.show({text1: 'Please enter review'});
      return;
    }
    const postData = new FormData();
    postData.append('id', route?.params?.id);
    postData.append('type', route?.params?.type);
    postData.append('comment', review);
    postData.append('rating', starRating);
    setShowLoader(true);
    try {
      const resp = await Service.postApiWithToken(
        userToken,
        Service.SUBMIT_REVIEW,
        postData,
      );
      if (resp?.data?.status) {
        Toast.show({text1: resp?.data?.message || resp?.data?.Message});
        setStarRating(1);
        setReview('');
        getProductDetails();
      } else {
        Toast.show({text1: resp?.data?.message || resp?.data?.Message});
      }
    } catch (error) {
      console.error('error in submitReview', error);
    }
    setShowReviewModal(false);
    setShowLoader(false);
  };

  //function : serv func
  const getCourseDetail = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const endPoint = `${API_Endpoints.course_details}/${id}`;
      const {response, status} = await Service.getAPI(endPoint, token);
      console.log('response', response);

      if (status) {
        setCourseData(response.data);
      }
    } catch (error) {
      console.error('error in getCourseDetail', error);
    }
  };
  //hook : useEffect
  useEffect(() => {
    getCourseDetail();

    return () => {};
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
        <View>
          <View style={styles.mainView}>
            <Video
              source={{uri: courseData.video}}
              style={{
                height: 200,
                width: '100%',
              }}
              controls
            />
            {/* {typeof productDetails === 'object' ? (
              <View
                style={{
                  overflow: 'hidden',
                  width: '100%',
                  alignSelf: 'center',
                  zIndex: -999,
                  borderRadius: 20,
                }}>
                {sliderData?.length > 0 ? (
                  <ImageSlider
                    data={sliderData}
                    autoPlay={false}
                    closeIconColor="#ED1C24"
                    // onItemChanged={handleItemChanged}
                    activeIndicatorStyle={{backgroundColor: 'red'}}
                    inActiveIndicatorStyle={{backgroundColor: '#fff'}}
                    indicatorContainerStyle={{top: -5}}
                    caroselImageStyle={{
                      resizeMode: 'stretch',
                      // height: '100%',
                      width: dimensions.SCREEN_WIDTH * 0.98,
                      height: dimensions.SCREEN_HEIGHT * 0.3,
                      borderRadius: 20,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      backgroundColor: 'red',
                      width: dimensions.SCREEN_WIDTH * 0.98,
                      height: dimensions.SCREEN_HEIGHT * 0.3,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontFamily: 'medium',
                      }}>
                      NO IMAGE FOUND
                    </Text>
                  </View>
                )}
              </View>
            ) : null} */}

            <View style={styles.topRow}>
              <MyText
                text={courseData.name}
                fontFamily={BLACK}
                fontSize={20}
                textColor={'black'}
                style={{width: '95%'}}
              />
            </View>
            <View style={{flexDirection: 'row', marginVertical: 5}}>
              <MyText
                text={'$'}
                fontFamily={BLACK}
                fontSize={20}
                textColor={BLACK}
                letterSpacing={0.14}
              />
              <MyText
                text={courseData.course_fee}
                fontFamily={BLACK}
                fontSize={20}
                textColor={DARK_PURPLE}
                letterSpacing={0.14}
                style={{}}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '89%',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Calendar></Calendar>
                <MyText
                  text={courseData.created_at}
                  fontFamily={REGULAR}
                  fontSize={16}
                  textColor={'black'}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Rating></Rating>
                <MyText
                  text={'4.7'}
                  fontFamily={REGULAR}
                  fontSize={16}
                  textColor={'black'}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Profile></Profile>
                <MyText
                  text={' Jane Doe'}
                  fontFamily={REGULAR}
                  fontSize={16}
                  textColor={'black'}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 7,
                justifyContent: 'space-between',
                width: dimensions.SCREEN_WIDTH * 0.9,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Chapter></Chapter>
                <MyText
                  text={' 3 Chapters'}
                  fontFamily={REGULAR}
                  fontSize={16}
                  textColor={'black'}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Quiz></Quiz>
                <MyText
                  text={' 200+ Quiz Questions '}
                  fontFamily={REGULAR}
                  fontSize={16}
                  textColor={'black'}
                />
              </View>
            </View>
            <MyText
              text={'Description'}
              fontFamily={EXTRA_BOLD}
              fontSize={16}
              textColor={'black'}
            />
            <MyText
              text={courseData.description}
              fontFamily={REGULAR}
              fontSize={14}
              textColor={'black'}
              style={{width: '95%', LINE_HEIGTH}}
            />
            <Divider
              style={{
                backgroundColor: '#CCCCFF',
                height: 2,
                marginVertical: 10,
              }}
              color="#CCCCFF"></Divider>
            <View style={styles.middleRow}>
              <View style={styles.middleLeftRow}></View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MyButton
                text={'Add to cart'}
                style={{flex: 1, marginRight: 10, backgroundColor: '#00B44B'}}
              />
              <MyButton
                text={'Buy Now'}
                style={{flex: 1, marginRight: 10, backgroundColor: '#5E4AF7'}}
              />
            </View>
            {/* {showModal.isVisible ? (
              <VideoModal
                isVisible={showModal.isVisible}
                toggleModal={toggleModal}
                videoDetail={{...showModal?.data, url: showModal?.data?.file}}
                // {...props}
              />
            ) : null} */}

            <ViewAll text="Tags" showSeeAll={false} style={{marginTop: 20}} />
            {tags?.length > 0 ? (
              <FlatList
                data={tags}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{marginTop: 11}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderTags}
              />
            ) : (
              <MyText
                text={'No Tags found!'}
                fontFamily="medium"
                fontSize={18}
                textAlign="center"
                textColor={'black'}
              />
            )}

            <Divider
              style={{height: 2, marginVertical: 10, marginTop: 12}}
              color="#CCCCFF"></Divider>
            <ViewAll
              text="Chapter "
              showSeeAll={false}
              style={{marginTop: 10}}
            />
            {courseData?.lessons?.length > 0 ? (
              <FlatList
                data={courseData?.lessons}
                verticall
                showsHorizontalScrollIndicator={false}
                style={{marginTop: 11}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderChapter}
              />
            ) : (
              <MyText
                text={'No Tags found!'}
                fontFamily="medium"
                fontSize={18}
                textAlign="center"
                textColor={'black'}
              />
            )}

            <View style={styles.ratingCotainer}>
              <Rating height={60} width={60}></Rating>

              <View>
                <MyText
                  text={'Rating & Review'}
                  fontFamily="medium"
                  fontSize={14}
                  textAlign="center"
                  textColor={'black'}
                />
                <MyText
                  text={'4.7(400k +)'}
                  fontFamily="medium"
                  fontSize={14}
                  textColor={YELLOW}
                />
              </View>
              <View style={styles.buttonReview}>
                <MyText
                  text={'Write your Review'}
                  fontFamily="medium"
                  fontSize={14}
                  textAlign="center"
                  textColor={'white'}
                />
              </View>
            </View>
            {reviewAll?.length > 0 ? (
              reviewAll?.map((item, index) => (
                <View
                  key={item.index?.toString()}
                  style={styles.reviewContainer}>
                  <View style={styles.reviewTopRow}>
                    <View style={styles.reviewTopLeftRow}>
                      <Image
                        source={
                          item?.profile_image
                            ? {uri: item?.profile_image}
                            : require('assets/images/ReviewPerson1.png')
                        }
                        style={styles.reviewImg}
                      />
                      <View style={{width: 210}}>
                        <MyText
                          text={`Robert Fox`}
                          fontFamily={REGULAR}
                          fontSize={16}
                          numberOfLines={2}
                          textColor={'black'}
                          style={{marginLeft: 10}}
                        />
                      </View>
                      <MyText
                        text={'1 month ago'}
                        fontFamily="medium"
                        fontSize={13}
                        textColor={'gray'}
                        textAlign={'right'}
                        style={{marginLeft: 10}}
                      />
                    </View>
                    <Image source={require('assets/images/ratingStar.svg')} />
                  </View>
                  <MyText
                    text={'Exellent course learnt so many things'}
                    fontFamily="medium"
                    fontSize={13}
                    textColor={'gray'}
                    style={{marginTop: 10}}
                  />
                </View>
              ))
            ) : (
              <MyText
                text={'No Reviews found'}
                fontFamily="medium"
                fontSize={18}
                textAlign="center"
                textColor={'black'}
              />
            )}
          </View>
          <Review
            key={reviewRef}
            visible={showReviewModal}
            setVisibility={setShowReviewModal}
            starRating={starRating}
            setStarRating={setStarRating}
            review={review}
            setReview={setReview}
            submitReview={submitReview}
            isReviewed={reviewbutton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseDetail;
