//import : react component
import React, {useState} from 'react';
import {View, TouchableOpacity, FlatList, Image} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import MyButton from 'component/MyButton/MyButton';
import ChapterContent from 'component/ChapterContent/ChapterContent';
//import : third party
import {ScrollView} from 'react-native-virtualized-view';
//import : utils
import Calendar from 'assets/images/calendar.svg';
import Clock from 'assets/images/clockGreen.svg';
import TaskSvg from 'assets/svgs/task-square.svg';
import NotFavSvg from 'assets/svgs/note-favorite.svg';
import {BLACK, REGULAR} from 'global/Fonts';
import {Colors} from 'global/index';
//import : styles
import {styles} from './ChapterDetailStyle';
//import : modals
//import : redux

const ChapterDetail = ({route}) => {
  //variables
  const {data} = route.params;

  //hook : states
  const [selectedItem, setSelectedItem] = useState(data.chapter_steps[0]);

  //UI
  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        heading={data.lesson_name}
        showNotification={false}
        showCart={false}
        showLearneLogo={false}
        showGridIcon={false}
      />
      <ScrollView>
        {Object.keys(selectedItem).length > 0 && (
          <ChapterContent
            course_img={data.image}
            url={selectedItem?.file}
            type={selectedItem?.type}
            item={selectedItem}
          />
        )}

        <View style={styles.mainView}>
          <MyText
            text={selectedItem.title}
            fontFamily={BLACK}
            fontSize={20}
            textColor={'black'}
            style={{width: '95%'}}
          />
          {/* <View
            style={{
              flexDirection: 'row',
              columnGap: 20,
            }}>
            <View style={{flexDirection: 'row', columnGap: 5}}>
              <Calendar />
              <MyText
                text={data?.lesson_created_at}
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
          </View> */}
          {/* <View
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
          </View> */}
          <MyText
            text={selectedItem?.description}
            fontFamily={REGULAR}
            fontSize={14}
            textColor={'black'}
            style={{width: '95%'}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <MyButton text={'Mark Incomplete'} width="48%" />
            <MyButton
              text={'Continue'}
              width="48%"
              backgroundColor={Colors.DARK_PURPLE}
            />
          </View>
          <FlatList
            data={data.chapter_steps}
            renderItem={({item, index}) => {
              return (
                <ChapterTask
                  icon={item.image}
                  title={item.title}
                  isSelected={item.title == selectedItem.title}
                  onPress={() => setSelectedItem(item)}
                />
              );
            }}
            keyExtractor={(item, index) => index + item}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ChapterDetail;

const ChapterTask = ({icon, isSelected, title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        borderRadius: 10,
        padding: 10,
        borderColor: isSelected ? Colors.YELLOW : Colors.LIGHT_PURPLE,
        borderWidth: 1,
        backgroundColor: 'white',
        marginVertical: 6,
      }}>
      <Image
        source={{uri: icon}}
        style={{
          height: 30,
          width: 30,
        }}
      />
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
