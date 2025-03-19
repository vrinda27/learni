//import : react component
import React, {useState} from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
//import : custom components
import MyText from 'component/MyText/MyText';
import MyButton from 'component/MyButton/MyButton';
//import : third party
//import : utils
import {Colors, Constants, MyIcon} from 'global/index';
//import : styles
import {styles} from './CourseFilterStyle';
//import : modals
//import : redux

const CourseFilter = ({visible, setVisibility, nextFunction = () => {}}) => {
  //hook : states
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('');
  const [selectedRatingFilter, setSelectedRatingFilter] = useState('');
  //function : modal func
  const closeModal = () => {
    setVisibility(false);
  };
  //function : imp func
  const applyFilters = () => {
    const data = {
      highlow: selectedPriceFilter,
      ratings: selectedRatingFilter,
    };
    closeModal();
    nextFunction(data);
  };
  //UI
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity style={styles.blurView} onPress={closeModal} />
        <View style={styles.mainView}>
          <MyText
            text="Filters"
            textColor={Colors.DARK_GREY}
            textAlign="center"
            fontSize={16}
            fontFamily="medium"
          />
          <MyText
            text={'Choose Tags'}
            textColor={Colors.DARK_GREY}
            fontSize={16}
            fontFamily="medium"
            marginBottom={10}
            marginTop={20}
          />
          <MyText
            text={'Select Price Filter'}
            textColor={Colors.DARK_GREY}
            fontSize={16}
            fontFamily="medium"
            marginBottom={10}
            marginTop={27}
          />
          {Constants?.price_filter_value?.map((el, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 10,
              }}
              onPress={() => setSelectedPriceFilter(el.id)}>
              <MyIcon.Ionicons
                name={
                  selectedPriceFilter == el.id
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }
                size={24}
                color={
                  selectedPriceFilter == el.id ? Colors.GREEN : Colors.BLACK
                }
              />
              <MyText
                text={el?.name}
                textColor={Colors.DARK_GREY}
                fontSize={14}
              />
            </TouchableOpacity>
          ))}
          <MyText
            text={'Select Rating Filter'}
            textColor={Colors.DARK_GREY}
            fontSize={16}
            fontFamily="medium"
            marginBottom={10}
            marginTop={27}
          />
          {[4, 3, 2, 1]?.map((el, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 10,
              }}
              onPress={() => setSelectedRatingFilter(el)}>
              <MyIcon.Ionicons
                name={
                  selectedRatingFilter == el
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }
                size={24}
                color={selectedRatingFilter == el ? Colors.GREEN : Colors.BLACK}
              />
              <MyText
                text={`${el} and more`}
                textColor={Colors.DARK_GREY}
                fontSize={14}
              />
            </TouchableOpacity>
          ))}
          <MyButton
            text="Apply"
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 41,
              marginBottom: 10,
              backgroundColor: Colors.THEME_GOLD,
            }}
            onPress={() => applyFilters()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CourseFilter;
