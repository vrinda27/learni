import {View, Text} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import Pdf from 'react-native-pdf';
import {dimensions} from 'global/Constants';

const ChapterContent = ({type, url}) => {
  if (type == 'video') {
    return (
      <Video
        source={{
          uri: url,
        }}
        controls
        style={{height: 250, width: '100%'}}
      />
    );
  } else if (type == 'pdf') {
    return (
      <Pdf
        source={{uri: url}}
        trustAllCerts={false}
        style={{height: dimensions.SCREEN_HEIGHT / 2, width: '100%'}}
      />
    );
  }
};

export default ChapterContent;
