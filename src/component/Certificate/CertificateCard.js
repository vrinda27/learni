//import : react components
import React, {useEffect, useRef, useState} from 'react';
import {
  View, 
  Switch,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';

//import : global

//import : styles
import { styles } from './CertificateCardStyle';
//import : modal
//import : redux
import {Colors, ScreenNames, Service} from 'global/index';
import {dimensions} from 'global/Constants';
import { REGULAR,BLACK ,BOLD} from 'global/Fonts';
import Divider from 'component/Divider/Divider';
import Eye from 'assets/images/eyeCertificate.svg'

import MyButton from 'component/MyButton/MyButton';
import Certicate from 'assets/images/certificate.svg';
import Profile from 'assets/images/profilePerson.svg';
import Rating from 'assets/images/rating.svg';
import Download from 'assets/images/downloadCertificate.svg'

const CertificateCard = ({orderHistoryData, viewDetails}) => {
  const renderOrder = ({item}) => {
    return (
      <View style={styles.courseContainer}>
       
        <View style={styles.courseSubContainer}>
          {/* <ImageBackground source={item.courseImg} style={styles.crseImg}> */}
            {/* <TouchableOpacity>
            <Image source={require('assets/images/play-icon.png')} />
          </TouchableOpacity> */}
          {/* </ImageBackground> */}
          <Certicate></Certicate>
          <View style={{marginLeft: 11, width: dimensions.SCREEN_WIDTH * 0.5}}>
            <MyText
              text={item.courseName}
              fontFamily={BOLD}
              fontSize={14}
              textColor={'#000000'}
              style={{width:dimensions.SCREEN_WIDTH*0.43}}
            />
            <View style={styles.middleRow}>
            <View style={styles.crtrRow}>
                <Profile width={24} height={24}></Profile>
                <MyText
                  text={item.creatorName}
                  fontFamily={BOLD}
                  fontSize={13}
                  textColor={'#000000'}
                  letterSpacing={0.13}
                  style={{marginLeft: 4}}
                />
              </View>
              <View style={styles.ratingRow}>
              <View style={{height:10,width:10,justifyContent:'center',alignItems:'center'}}>
          {/* <Image resizeMode='contain' source={require('assets/images/star.png')} style={{height:12,minWidth:12}} /> */}
          <Rating style={{marginLeft:24}}></Rating>
           </View>
                <MyText
                  text={item.courseRating}
                  fontFamily="regular"
                  fontSize={13}
                  textColor={'#000000'}
                  letterSpacing={0.13}
                  style={{marginLeft: 20,marginTop:2}}
                />
              </View>
            
            </View>
           
            <View style={styles.tickRow}>
              {/* <Image source={require('assets/images/small-tick.png')} /> */}
              <Eye height={36} width={36}></Eye>
              <Download style={{marginLeft:10}} height={36} width={36}></Download>
            </View>
          </View>
        </View>
        {/* <Divider
          style={{borderColor: '#ECECEC', marginTop: 11, marginBottom: 5}}
        />
        <TouchableOpacity style={{alignSelf: 'center'}}>
          <MyText
            text={'Download Payment Invoice'}
            fontFamily="medium"
            fontSize={14}
            textColor={Colors.THEME_GOLD}
            style={{}}
          />
        </TouchableOpacity> */}
      </View>
    );
  };
  return (
    <FlatList
      data={orderHistoryData}
      style={{marginTop: 28}}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderOrder}
    />
  );
};

export default CertificateCard;