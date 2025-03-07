import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './ViewContentStyle';
import Header from 'component/Header/Header';
const ViewContent = () => {
  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        heading={'View Content'}
        showNotification={false}
        showCart={false}
        showLearneLogo={false}
        showGridIcon={false}
      />
      <Text>ViewContent</Text>
    </View>
  );
};

export default ViewContent;
