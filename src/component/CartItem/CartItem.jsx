//import : react component
import React from 'react';
import {View, Image} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';
//import : third party
//import : utils
import {BOLD, MEDIUM} from 'global/Fonts';
import {dimensions} from 'global/Constants';
import Rating from 'assets/images/rating.svg';
import {Colors} from 'global/index';
//import : styles
import {styles} from './CartItemStyle';
//import : modals
//import : redux

const CartItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: item.image}}
        style={{
          height: dimensions.SCREEN_WIDTH / 3,
          width: dimensions.SCREEN_WIDTH / 3,
        }}
      />
      <View style={{width: '55%', justifyContent: 'space-around'}}>
        <MyText text={item.name} fontFamily={BOLD} />
        <View
          style={{flexDirection: 'row', alignItems: 'center', columnGap: 20}}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Rating />
            <MyText text={item.rating} />
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <MyText
              text={'$'}
              fontFamily="bold"
              fontSize={14}
              textColor={Colors.BLACK}
              letterSpacing={0.14}
              style={{}}
            />
            <MyText
              text={item.total_amount}
              fontFamily="bold"
              fontSize={14}
              textColor={Colors.DARK_PURPLE}
              letterSpacing={0.14}
              style={{}}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 5,
          }}>
          <Image
            source={{uri: item.creator_profile}}
            style={{
              height: 20,
              width: 20,
              borderRadius: 100,
            }}
          />
          <MyText text={item.creator_name} fontFamily={MEDIUM} fontSize={12} />
        </View>
      </View>
    </View>
  );
};

export default CartItem;
