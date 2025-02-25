import React from 'react';
import {View, StyleSheet, Modal, ActivityIndicator} from 'react-native';
import {Colors} from '../../global';

const Loader = ({visible, indicatorColor}) => {
  return (
    <Modal
      visible={visible ? visible : false}
      transparent={true}
      animationType="fade">
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color={indicatorColor ? indicatorColor : Colors.LIGHT_PURPLE}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

export default Loader;
