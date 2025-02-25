import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../../global';
import FastImage from 'react-native-fast-image';
import StarIcon from '../../assests/images/star.svg';
import GreenEye from '../../assests/images/eye-green.svg';
import Download from '../../assests/images/download.svg';

const CertificateCard = ({
  certificateUrl,
  title = '',
  profileImageUrl,
  profileName = '',
  rating = '',
  style,
  onPressViewButton = () => {},
  onPressDownloadButton = () => {},
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        {certificateUrl && (
          <FastImage
            source={{uri: certificateUrl, priority: FastImage.priority.high}}
            resizeMode={FastImage.resizeMode.stretch}
            style={styles.image}
          />
        )}
      </View>
      <View style={styles.rightSideContainerStyle}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.imageAndRatingContainer}>
          <View style={styles.imageAndNameContainer}>
            {profileImageUrl && (
              <FastImage
                source={{
                  uri: profileImageUrl,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.stretch}
                style={styles.profileImage}
              />
            )}
            <Text style={styles.profileNameTextStyle} numberOfLines={1}>
              {profileName}
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <StarIcon />
            <Text
              style={{
                ...styles.profileNameTextStyle,
                marginLeft: responsiveWidth(1),
              }}>
              {rating}
            </Text>
          </View>
        </View>

        <View style={styles.iconButtonContainer}>
          <TouchableOpacity onPress={onPressViewButton}>
            <GreenEye />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressDownloadButton}
            style={{marginLeft: responsiveWidth(2)}}>
            <Download />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(2),
    height: responsiveHeight(16),
    width: '100%',
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: responsiveHeight(0.15),
    borderRadius: responsiveWidth(3),
    backgroundColor: 'white',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    width: '40%',
    borderRadius: responsiveWidth(4),
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  rightSideContainerStyle: {
    paddingHorizontal: responsiveWidth(2.5),
    width: '70%',
  },
  title: {
    width: '90%',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  imageAndRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: responsiveHeight(1.2),
  },
  imageAndNameContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileImage: {
    height: responsiveHeight(3),
    width: responsiveHeight(3),
    borderRadius: responsiveHeight(3),
  },
  profileNameTextStyle: {
    marginLeft: responsiveWidth(2),
    width: responsiveWidth(25),
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: responsiveWidth(2),
  },
  iconButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: responsiveWidth(1.7),
  },
});

export default CertificateCard;
