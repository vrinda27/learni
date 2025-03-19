//import : react component
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
//import : custom components
import Header from 'component/Header/Header';
//import : third party
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
//import : utils
import {Colors, MyIcon} from 'global/index';
import {BOLD, SEMI_BOLD} from 'global/Fonts';
//import : styles
import {styles} from './ChatScreenStyle';
//import : modals
//import : redux

const ChatScreen = ({route}) => {
  //variables
  const {id} = route.params;
  const adminId = 1;
  //hook : states
  const [message, setMessage] = useState('');
  const [messagesData, setMessagesData] = useState([]);
  //function : serv func
  const sendMessage = async () => {
    if (message == '') {
    } else {
      try {
        const Data = {
          userId: id,
          message: message,
          createdAt: new Date(),
        };
        const docId = adminId.toString() + id?.toString();
        firestore()
          .collection('Chat')
          .doc(docId)
          .collection('Messages')
          .add({...Data, createdAt: firestore.FieldValue.serverTimestamp()})
          .then(() => {
            console.log('message added in firestore');
          });
        setMessage('');
      } catch (error) {
        console.log('error in sendMessage', error);
      }
    }
  };
  const adminSendMessage = async () => {
    if (message == '') {
    } else {
      try {
        const Data = {
          userId: 1,
          message: message,
          createdAt: new Date(),
        };
        const docId = '12';
        firestore()
          .collection('Chat')
          .doc(docId)
          .collection('Messages')
          .add({...Data, createdAt: firestore.FieldValue.serverTimestamp()})
          .then(() => {
            console.log('message added in firestore');
          });
        setMessage('');
      } catch (error) {
        console.log('error in sendMessage', error);
      }
    }
  };
  //function : render func
  const chatRenderFunction = ({item}) => {
    return (
      <View
        key={item.id}
        style={{
          marginVertical: 10,
          alignItems: id == item?.userId ? 'flex-end' : 'flex-start',
        }}>
        <View
          style={{
            backgroundColor:
              id == item?.userId ? Colors.GREEN : Colors.DARK_PURPLE,
            borderRadius: 10,
            padding: 10,
          }}>
          {item?.message ? (
            <Text
              style={{
                color: id == item?.userId ? Colors.BLACK : Colors.WHITE,
                fontFamily: BOLD,
              }}>
              {item?.message}
            </Text>
          ) : null}
        </View>
        <View style={{}}>
          <Text
            style={{
              fontFamily: SEMI_BOLD,
              fontSize: 8,
              marginHorizontal: 5,
            }}>
            {moment(item.createdAt).format('lll')}
          </Text>
        </View>
      </View>
    );
  };
  //hook : useEffect
  useEffect(() => {
    const docId = adminId.toString() + id?.toString();
    const MessageRef = firestore()
      .collection('Chat')
      .doc(docId)
      .collection('Messages')
      .orderBy('createdAt', 'desc');
    const unSubscribe = MessageRef.onSnapshot(querySnap => {
      if (querySnap != null) {
        const AllMsg = querySnap.docs.map(docSnap => {
          const data = docSnap.data();
          if (data.createdAt) {
            return {
              ...docSnap.data(),
              createdAt: docSnap.data().createdAt.toDate(),
            };
          } else {
            return {
              ...docSnap.data(),
              createdAt: new Date(),
            };
          }
        });
        setMessagesData(AllMsg);
      } else {
        setMessagesData([]);
      }
    });
    return () => unSubscribe();
  }, [id]);
  //UI
  return (
    <View style={styles.container}>
      <Header heading={'Chat'} showLearneLogo={false} showCart={false} />
      <FlatList
        inverted
        // ref={flatListRef}
        //onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: false })}
        //onLayout={() => flatListRef.current.scrollToEnd({ animated: false })}
        style={{paddingHorizontal: 20}}
        showsVerticalScrollIndicator={false}
        data={messagesData}
        renderItem={chatRenderFunction}
        keyExtractor={(item, index) => index.toString()}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: Colors.WHITE,
          borderRadius: 10,
          margin: 5,
        }}>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          placeholder="Type something here"
          style={{
            width: '80%',
          }}
        />
        <TouchableOpacity
          onPress={() => sendMessage()}
          style={{
            backgroundColor: Colors.GREEN,
            borderRadius: 100,
            padding: 8,
          }}>
          <MyIcon.Feather name="send" size={28} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
