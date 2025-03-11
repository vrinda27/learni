import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MyText from 'component/MyText/MyText';
import {styles} from './TagItemStyle';
const TagsItem = ({item}) => {
  return (
    <TouchableOpacity
      // onPress={() => changeSelectedTag(item.id)}
      style={styles.courseTypeContainer}>
      <MyText text={item?.name} fontFamily="regular" fontSize={14} />
    </TouchableOpacity>
  );
};

export default TagsItem;
