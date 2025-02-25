//import : react components
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
//import : custom components
import CustomPhoneInput from 'component/TextInput/CustomPhoneInput';
import MyButton from 'component/MyButton/MyButton';
import Header from 'component/Header/Header';
import MyTextInput from 'component/MyTextInput/MyTextInput';
//import : third parties
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : styles
import {styles} from './EditProfileStyle';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Colors, Service} from 'global/index';
//import : utils
import UserLogo from 'assets/images/user.svg';
import EmailLogo from 'assets/images/sms.svg';
import Loader from 'component/loader/Loader';
import {API_Endpoints} from 'global/Service';

const EditProfile = ({route, navigation}) => {
  //variables
  const {data} = route.params;
  console.log('DATA', data);

  //hook : states
  const [editProfileData, setEditProfileData] = useState({
    name: data.name,
    email: data.email,
  });
  const [number, setNumber] = useState({
    number: data.mobile,
    cca2: 'US',
    callingCode: Number(data.country_code),
  });
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  //function : nav func
  const goBack = () => {
    navigation.goBack();
  };
  //function :imp func
  const numberHandler = number => {
    setNumber(value => ({...value, number}));
  };
  const countryCodeHandler = code => {
    setNumber(value => ({
      ...value,
      cca2: code?.cca2,
      callingCode: code?.callingCode[0],
    }));
  };
  //function : serv func
  const updateProfile = async () => {
    try {
      setShowLoader(true);
      const postData = {
        name: editProfileData.name,
        email: editProfileData.email,
        country_code: '+' + number.callingCode,
        mobile: number.number?.replace(/\D/g, ''),
        cca2: number.cca2,
        image: '',
      };
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.postAPI(
        API_Endpoints.update_profile,
        postData,
        token,
      );
      if (status) {
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        goBack();
      }
      console.log('response', response);
    } catch (err) {
      console.error('error in registering user', err);
    } finally {
      setShowLoader(false);
    }
  };
  //UI
  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        showNotification={true}
        showGridIcon={false}
      />
      <ScrollView>
        <View style={styles.mainView}>
          <MyTextInput
            placeholder="Name"
            value={editProfileData.name}
            leftIcon={<UserLogo />}
            onChangeText={val =>
              setEditProfileData(prevState => {
                return {
                  ...prevState,
                  name: val,
                };
              })
            }
          />

          <MyTextInput
            placeholder="Email Address"
            value={editProfileData.email}
            leftIcon={<EmailLogo />}
            onChangeText={val =>
              setEditProfileData(prevState => {
                return {
                  ...prevState,
                  email: val,
                };
              })
            }
          />
          <CustomPhoneInput
            number={number?.number}
            onChangeNumber={numberHandler}
            onSelectCountryCode={countryCodeHandler}
            cca2={number?.cca2}
            callingCode={number?.callingCode}
            placeholder="Phone"
            maxLength={10}
            style={{marginVertical: responsiveHeight(1)}}
            numberFieldContainerStyle={{}}
          />

          <View style={{height: 20}} />
          <MyButton text={'Save Changes'} onPress={() => updateProfile()} />
          <View style={{height: 20}} />
          <MyButton text={'Clear All'} backgroundColor={Colors.DARK_PURPLE} />
        </View>
      </ScrollView>
      <Loader visible={showLoader} />
    </View>
  );
};

export default EditProfile;
