//import : react component
import React from 'react';
import {View, Text} from 'react-native';
//import : custom components
import SizeBox from 'component/SizeBox/SizeBox';
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
//import : third party
//import : utils
import {SEMI_BOLD} from 'global/Fonts';
import {MyIcon} from 'global/index';
import ExportSvg from 'assets/svgs/export.svg';
//import : styles
import {styles} from './AddAssignmentStyle';
//import : modals
//import : redux
const AddAssignment = () => {
  //UI
  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        heading={'Add Assignment'}
        showNotification={false}
        showCart={false}
        showLearneLogo={false}
        showGridIcon={false}
      />
      <View style={styles.mainView}>
        <View
          style={{
            borderStyle: 'dotted',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#5E4AF7',
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MyText text={'Upload your file'} fontFamily={SEMI_BOLD} />
          <MyText text={'pdf, doc, docx, xlsx. Max. File are allowed'} />
          <MyText text={'Size: 5 MB'} />
          <SizeBox height={10} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              borderStyle: 'dotted',
              borderRadius: 5,
              borderWidth: 2,
              borderColor: '#5E4AF7',
              padding: 10,
            }}>
            <ExportSvg />
            <MyText text={'Upload File'} />
            <MyIcon.AntDesign name="arrowright" size={24} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddAssignment;
