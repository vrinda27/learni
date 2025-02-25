//react components
import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
//global
import Search from 'assets/images/search.svg'
import MyText from '../MyText/MyText';
//import : styles
import {styles} from './SearchWithIconStyle';

///import svg
const SearchWithIcon = ({
  placeholder,
  placeholderTextColor = '#8F93A0',
  value,
  setValue,
  icon,
  onChangeText,
//   icon = <MyIcon.AntDesign name="search1" color={Colors.WHITE} size={24} />,
  onPress = () => {},
  showDot = () => {},
  style = {},
}) => {
  //UI
  return (
    <View style={{...styles.searchContainer, ...style}}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={'#8F93A0'}
        style={styles.inputStyle}
      />
      <TouchableOpacity onPress={onPress} style={styles.iconView}>
    <Search></Search>
        {showDot()?
          <View style={styles.dot} />
        :null}
      </TouchableOpacity>
    </View>
  );
};

export default SearchWithIcon;