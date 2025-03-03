//import : react component
import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import MyButton from 'component/MyButton/MyButton';
//import : third party
import Video from 'react-native-video';
//import : utils
import Calendar from 'assets/images/calendar.svg';
import Clock from 'assets/images/clockGreen.svg';
import TaskSvg from 'assets/svgs/task-square.svg';
import NotFavSvg from 'assets/svgs/note-favorite.svg';
import PdfSvg from 'assets/svgs/chaptersvg/document-pdf.svg';
import AssignmentSvg from 'assets/svgs/chaptersvg/document-text.svg';
import VideoSvg from 'assets/svgs/chaptersvg/video.svg';
import QuizSvg from 'assets/svgs/chaptersvg/quiz.svg';
import SurveySvg from 'assets/svgs/chaptersvg/clipboard-tick.svg';
import NoteSvg from 'assets/svgs/chaptersvg/note.svg';
import {BLACK, REGULAR} from 'global/Fonts';
import {LIGHT_PURPLE} from 'global/Color';
import {Colors} from 'global/index';
//import : styles
import {styles} from './ChapterDetailStyle';
//import : modals
//import : redux

const ChapterDetail = () => {
  //UI
  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        heading={'Chapter 1'}
        showNotification={true}
        showCart={false}
        showLearneLogo={false}
        showGridIcon={false}
      />
      <ScrollView>
        <Video
          source={{
            uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          controls
          style={{height: 250, width: '100%'}}
        />
        <View style={styles.mainView}>
          <MyText
            text={
              'Lorem ipsum dolor sit amet, dolor is consectetur adipiscing elit.'
            }
            fontFamily={BLACK}
            fontSize={20}
            textColor={'black'}
            style={{width: '95%'}}
          />
          <View
            style={{
              flexDirection: 'row',
              columnGap: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Calendar />
              <MyText
                text={' 26 Dec 2024'}
                fontFamily={REGULAR}
                fontSize={16}
                textColor={'black'}
              />
            </View>
            <View style={{flexDirection: 'row', columnGap: 5}}>
              <Clock />
              <MyText
                text={'10min'}
                fontFamily={REGULAR}
                fontSize={16}
                textColor={'black'}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              columnGap: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TaskSvg />
              <MyText
                text={' 26 Dec 2024'}
                fontFamily={REGULAR}
                fontSize={16}
                textColor={'black'}
              />
            </View>
            <View style={{flexDirection: 'row', columnGap: 5}}>
              <NotFavSvg />
              <MyText
                text={'10min'}
                fontFamily={REGULAR}
                fontSize={16}
                textColor={'black'}
              />
            </View>
          </View>
          <MyText
            text={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus orci lorem, gravida quis risus in, imperdiet posuere elit. Fusce consectetur scelerisque tortor. Suspendisse ac ultrices dolor, ac aliquam lectus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus orci lorem, gravida quis risus in, imperdiet posuere elit. Fusce consectetur scelerisque tortor. Suspendisse ac ultrices dolor, ac aliquam lectus.'
            }
            fontFamily={REGULAR}
            fontSize={14}
            textColor={'black'}
            style={{width: '95%'}}
          />
          <ChapterTask icon={<PdfSvg />} title={'Pdf'} />
          <ChapterTask icon={<AssignmentSvg />} title={'Assignment'} />
          <ChapterTask icon={<VideoSvg />} title={'Video'} />
          <ChapterTask icon={<QuizSvg />} title={'Quiz'} />
          <ChapterTask icon={<SurveySvg />} title={'Survey'} />
          <ChapterTask icon={<NoteSvg />} title={'Content'} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <MyButton text={'Mark Incomplete'} width="48%" />
            <MyButton
              text={'Continue'}
              width="48%"
              backgroundColor={Colors.DARK_PURPLE}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChapterDetail;

const ChapterTask = ({icon, title}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        borderRadius: 10,
        padding: 10,
        borderColor: LIGHT_PURPLE,
        borderWidth: 1,
        backgroundColor: 'white',
        marginVertical: 6,
      }}>
      {icon && icon}
      <MyText
        text={title}
        fontFamily={BLACK}
        fontSize={14}
        textColor={'black'}
        style={{width: '95%'}}
      />
    </TouchableOpacity>
  );
};
