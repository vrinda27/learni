import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import MyText from 'component/MyText/MyText';
import {dimensions} from 'global/Constants';
import {Colors} from 'global/index';
import {REGULAR} from 'global/Fonts';

const CategoryCard = ({item, onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.categoryContainer}>
      <Image source={{uri: item.image}} style={styles.categoryImg} />
      <MyText
        text={item.name}
        fontFamily={REGULAR}
        fontSize={13}
        textAlign="center"
        textColor={'#455A64'}
        style={{marginTop: 5}}
      />
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  categoryContainer: {
    height: 'auto',
    width: dimensions.SCREEN_WIDTH * 0.27,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: Colors.LIGHT_PURPLE,
    borderWidth: 1,
    marginRight: 8,
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  categoryImg: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
});
