import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './NotPurchaseStyle';
import MyText from 'component/MyText/MyText';
import {Colors, MyIcon} from 'global/index';
import MyButton from 'component/MyButton/MyButton';
import {BOLD} from 'global/Fonts';
import SizeBox from 'component/SizeBox/SizeBox';
const NotPurchase = ({visible, setVisibility}) => {
  //function : modal func
  const closeModal = () => {
    setVisibility(false);
  };
  //UI
  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      transparent
      animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={styles.mainView}>
          <MyIcon.AntDesign
            name="questioncircle"
            size={70}
            color={Colors.GREEN}
            style={{
              alignSelf: 'center',
            }}
          />
          <SizeBox height={10} />
          <MyText
            text={'Prerequisite(s) have not yet been completed!'}
            fontFamily={BOLD}
            fontSize={18}
            textAlign="center"
          />
          <MyText
            text={
              'To move forward, please complete all prerequisites in Chapter 2: Frequently Asked Questions'
            }
            textAlign="center"
          />
          <MyButton text={'Purchase'} />
          <SizeBox height={10} />
          <MyText
            text={'Close'}
            style={{alignSelf: 'center'}}
            fontFamily={BOLD}
          />
        </View>
      </View>
    </Modal>
  );
};

export default NotPurchase;
