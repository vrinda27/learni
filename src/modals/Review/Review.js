//import : react component
import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, TextInput} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';
//import : third party
//import : utils
import {BLACK} from 'global/Fonts';
import {Colors, MyIcon} from 'global/index';
//import : styles
import {styles} from './ReviewStyle';
import MyButton from 'component/MyButton/MyButton';
import SizeBox from 'component/SizeBox/SizeBox';
//import : modals
//import : redux

const Review = ({visible, setVisibility}) => {
  //variables
  let starArray = [1, 2, 3, 4, 5];
  //hook : states
  const [selectedStar, setSelectedStar] = useState(1);
  const [reviewMsg, setReviewMsg] = useState('');
  //function : modal func
  const closeModal = () => {
    setVisibility(false);
  };
  //UI
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.blurView}
          onPress={() => closeModal()}
        />
        <View style={styles.mainView}>
          <MyText
            text={'Review & Rating'}
            fontFamily={BLACK}
            fontSize={18}
            textColor={'black'}
            textAlign="center"
            style={{width: '95%'}}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              columnGap: 10,
              marginVertical: 10,
            }}>
            {starArray.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setSelectedStar(item)}
                  key={index.toString()}>
                  <MyIcon.AntDesign
                    name={item <= selectedStar ? 'star' : 'staro'}
                    size={24}
                    color={Colors.YELLOW}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <TextInput
            value={reviewMsg}
            style={styles.reviewInput}
            underlineColorAndroid="transparent"
            placeholder={'Type your review here…'}
            placeholderTextColor="#999999"
            textAlignVertical="top"
            numberOfLines={10}
            multiline={true}
            onChangeText={e => setReviewMsg(e)}
          />
          <SizeBox height={10} />
          <MyButton text={'Submit'} />
          <SizeBox height={10} />
          <MyButton text={'Clear All'} backgroundColor={Colors.DARK_PURPLE} />
        </View>
      </View>
    </Modal>
  );
};

export default Review;
