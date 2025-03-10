//import : react components
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import ViewAll from 'component/ViewAll/ViewAll';
import MyButton from 'component/MyButton/MyButton';
import Divider from 'component/Divider/Divider';
import ChapterCard from 'component/ChapterCard/ChapterCard';
//import : third parties
import Video from 'react-native-video';
import Toast from 'react-native-toast-message';
import {ScrollView} from 'react-native-virtualized-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : utils
import {API_Endpoints} from 'global/Service';
import {Colors, ScreenNames, Service} from 'global/index';
import Background from 'assets/svgs/background.svg';
import Calendar from 'assets/images/calendar.svg';
import Rating from 'assets/images/rating.svg';
import Chapter from 'assets/images/chapter.svg';
import Quiz from 'assets/images/quizQues.svg';
import {BLACK, BOLD, EXTRA_BOLD, REGULAR} from 'global/Fonts';
import {DARK_PURPLE, YELLOW} from 'global/Color';
//import : styles
import {styles} from './CourseDetailStyle';
//import : modal
import Review from 'modals/Review/Review';
import CourseDetailLoader from 'component/SkeltonLoader/CourseDetailLoader';

const CourseDetail = ({navigation, dispatch, route}) => {
  // variables : ref
  const {id} = route?.params;
  //variables
  const LINE_HEIGTH = 25;
  //variables : redux
  const [courseData, setCourseData] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [selectedTag, setSelectedTag] = useState('1');
  const [review, setReview] = useState('');
  const [starRating, setStarRating] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  //function : nav func
  const gotoChapterDetail = data => {
    navigation.navigate(ScreenNames.CHAPTER_DETAIL, {data});
  };
  //function : imp func
  const initLoader = async () => {
    setShowLoader(true);
    await getCourseDetail();
    setShowLoader(false);
  };
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
      if (status) {
        setCourseData(response.data);
      }
    } catch (error) {
      console.error('error in getCourseDetail', error);
    }
  };
  //hook : useEffect
  useEffect(() => {
    initLoader();

    return () => {};
  }, []);
  //UI
  if (showLoader) {
    return <CourseDetailLoader />;
  } else {
    return (
      <View style={styles.container}>
        <Background style={StyleSheet.absoluteFill} />
        <Header
          showBackButton={true}
          heading={courseData.name}
          showNotification={false}
          showCart={false}
          showLearneLogo={false}
          showGridIcon={false}
        />
        <Video
          source={{uri: courseData.video}}
          style={{
            height: 200,
            width: '100%',
            backgroundColor: Colors.BLACK,
          }}
          controls
        />
        <ScrollView>
          <View style={styles.mainView}>
            <MyText
              text={courseData.name}
              fontFamily={BLACK}
              fontSize={20}
              textColor={'black'}
              style={{width: '95%'}}
            />
            <View style={{flexDirection: 'row'}}>
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
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 5,
                }}>
                <Calendar />
                <MyText
                  text={courseData.created_at}
                  fontFamily={BOLD}
                  fontSize={12}
                  textColor={'black'}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 5,
                }}>
                <Rating />
                <MyText
                  text={courseData.rating}
                  fontFamily={BOLD}
                  fontSize={12}
                  textColor={'black'}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 5,
                }}>
                <Image
                  source={{uri: courseData.creator_profile}}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 100,
                  }}
                />
                <MyText
                  text={courseData.creator_name}
                  fontFamily={BOLD}
                  fontSize={12}
                  textColor={'black'}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 7,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 5,
                }}>
                <Chapter />
                <MyText
                  text={`${courseData.lesson_count} Lessons`}
                  fontFamily={BOLD}
                  fontSize={12}
                  textColor={'black'}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 5,
                }}>
                <Quiz />
                <MyText
                  text={`${courseData.total_quiz} Quiz Questions`}
                  fontFamily={BOLD}
                  fontSize={12}
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
              color={Colors.LIGHT_PURPLE}
              borderBottomWidth={2}
              marginVertical={10}
            />
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
              color={Colors.LIGHT_PURPLE}
              borderBottomWidth={2}
              marginVertical={10}
            />
            <ViewAll
              text="Chapter "
              showSeeAll={false}
              style={{marginTop: 10}}
            />
            {courseData?.lessons?.length > 0 ? (
              <FlatList
                data={courseData?.lessons}
                style={{marginTop: 11}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <ChapterCard
                    item={item}
                    onPress={() => gotoChapterDetail(item)}
                  />
                )}
              />
            ) : (
              <MyText
                text={'No Chapters found!'}
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
                  text={`${courseData.rating}(${courseData?.review_list?.length})`}
                  fontFamily="medium"
                  fontSize={14}
                  textColor={YELLOW}
                />
              </View>
              <TouchableOpacity
                onPress={() => setShowReviewPopup(true)}
                style={styles.buttonReview}>
                <MyText
                  text={'Write your Review'}
                  fontFamily="medium"
                  fontSize={14}
                  textAlign="center"
                  textColor={'white'}
                />
              </TouchableOpacity>
            </View>
            {courseData?.review_list?.length > 0 ? (
              courseData?.review_list?.map((item, index) => (
                <View
                  key={item.index?.toString()}
                  style={styles.reviewContainer}>
                  <View style={styles.reviewTopLeftRow}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={
                          item?.review_by_profile
                            ? {uri: item?.review_by_profile}
                            : require('assets/images/ReviewPerson1.png')
                        }
                        style={styles.reviewImg}
                      />
                      <View style={{marginLeft: 10}}>
                        <MyText
                          text={item.review_by_name}
                          fontFamily={REGULAR}
                          fontSize={16}
                          numberOfLines={2}
                          textColor={'black'}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            columnGap: 5,
                          }}>
                          <Rating />
                          <MyText text={item.rating} />
                        </View>
                      </View>
                    </View>

                    <MyText
                      text={item.review_on}
                      fontFamily="medium"
                      fontSize={13}
                      textColor={'gray'}
                      textAlign={'right'}
                      style={{marginLeft: 10}}
                    />
                  </View>
                  <MyText
                    text={item.review}
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
            <Review
              visible={showReviewPopup}
              setVisibility={setShowReviewPopup}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default CourseDetail;
