import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../global';
import VectoreIcon from '../../assests/images/Vector.svg';

const NotificationCard = ({title = '', description = ''}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.subContainer}>
        <View style={styles.box}>
          <VectoreIcon />
        </View>
        <Text style={styles.description}> {description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: responsiveHeight(12),
    paddingVertical: responsiveHeight(0.7),
    paddingHorizontal: responsiveWidth(3),
    width: '100%',
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: responsiveHeight(0.15),
    borderRadius: responsiveWidth(3),
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    width: '90%',
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(5),
    width: responsiveHeight(5),
    borderRadius: responsiveWidth(2.5),
    backgroundColor: Colors.GREEN,
  },
  description: {
    paddingHorizontal: responsiveWidth(3),
    width: '90%',
    fontSize: responsiveFontSize(2),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
});

export default NotificationCard;
