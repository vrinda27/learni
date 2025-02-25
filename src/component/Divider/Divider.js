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
} from 'react-native';


const Divider = ({style = {},color = 'red'}) => {
  return (
    <View
      style={[ { borderBottomColor: color, borderBottomWidth: 1 },  style]}></View>
  );
};

export default Divider;