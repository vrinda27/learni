//import : react component
import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
//import : custom components
import SizeBox from 'component/SizeBox/SizeBox';
import Header from 'component/Header/Header';
import MyText from 'component/MyText/MyText';
import Loader from 'component/loader/Loader';
import MyButton from 'component/MyButton/MyButton';
//import : third party
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
//import : utils
import {SEMI_BOLD} from 'global/Fonts';
import {Colors, MyIcon, Service} from 'global/index';
import ExportSvg from 'assets/svgs/export.svg';
import {API_Endpoints} from 'global/Service';
//import : styles
import {styles} from './AddAssignmentStyle';
//import : modals
import AskMedia from 'modals/AskMedia/AskMedia';
//import : redux

const AddAssignment = ({route}) => {
  //variables
  const {data} = route.params;
  //hook : states
  const [files, setFiles] = useState([]);
  const [assignments, setAssignments] = useState([]);
  //hook : modal states
  const [showAskMedia, setShowAskMedia] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  //function : imp func
  const uploadFilePress = () => {
    setShowAskMedia(true);
  };
  //function : serv func
  const getAssignmentInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const endPoint = `${API_Endpoints.assignment_details}/${data.step_id}`;
      const {response, status} = await Service.getAPI(endPoint, token);
      if (status) {
        setAssignments(response?.data?.uploads);
      }
    } catch (error) {
      console.error('error in getAssignmentInfo', error);
    }
  };
  const selectFile = async () => {
    try {
      const results = await DocumentPicker.pick({
        allowMultiSelection: true,
        type: [DocumentPicker.types.allFiles],
      });
      setFiles(results);
    } catch (error) {
      console.error('error in selectFile', error);
    }
  };
  const uploadAssignment = async () => {
    setShowLoader(true);
    try {
      const formData = new FormData();
      formData.append('chapter_step_id', data.step_id);
      if (files.length > 0) {
        files.map(item => {
          return formData.append('file[]', item);
        });
      }
      const token = await AsyncStorage.getItem('token');
      const {response, status} = await Service.postAPI(
        API_Endpoints.upload_assignment,
        formData,
        token,
      );
      if (status) {
        Toast.show({
          type: 'success',
          text1: response?.message,
        });
        setFiles([]);
        getAssignmentInfo();
      }
    } catch (error) {
      console.error('error in uploadAssignment', error);
    } finally {
      setShowLoader(false);
    }
  };
  //hook : useEffect
  useEffect(() => {
    getAssignmentInfo();

    return () => {};
  }, []);

  //UI
  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        heading={'Add Assignment'}
        showNotification={false}
        showCart={false}
        showLearneLogo={false}
        showGridIcon={false}
      />
      <View style={styles.mainView}>
        <View
          style={{
            borderStyle: 'dotted',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#5E4AF7',
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MyText text={'Upload your file'} fontFamily={SEMI_BOLD} />
          <MyText text={'pdf, doc, docx, xlsx. Max. File are allowed'} />
          <MyText text={'Size: 5 MB'} />
          <SizeBox height={10} />
          {files.length > 0 ? (
            <>
              {files.map((item, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      borderStyle: 'dotted',
                      borderRadius: 5,
                      borderWidth: 2,
                      borderColor: '#5E4AF7',
                      padding: 10,
                      marginBottom: 10,
                    }}>
                    <MyIcon.AntDesign
                      name="file1"
                      size={24}
                      color={Colors.BLACK}
                    />
                    <MyText text={item.name} style={{width: '70%'}} />
                    <MyIcon.AntDesign
                      name="delete"
                      size={24}
                      color={Colors.RED}
                    />
                  </View>
                );
              })}
              <MyButton text={'Upload'} onPress={() => uploadAssignment()} />
            </>
          ) : (
            <TouchableOpacity
              onPress={() => selectFile()}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                borderStyle: 'dotted',
                borderRadius: 5,
                borderWidth: 2,
                borderColor: '#5E4AF7',
                padding: 10,
              }}>
              <ExportSvg />
              <MyText text={'Upload File'} />
              <MyIcon.AntDesign name="arrowright" size={24} />
            </TouchableOpacity>
          )}
        </View>
        <View>
          {assignments.length > 0 && (
            <>
              {assignments.map((item, index) => {
                console.log(item);

                return (
                  <View
                    style={{
                      marginVertical: 10,
                      borderRadius: 15,
                      borderWidth: 1,
                      borderColor: '#5E4AF7',
                      padding: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: 10,
                    }}>
                    <Image
                      source={{uri: item.file}}
                      style={{
                        height: 50,
                        width: 50,
                      }}
                    />
                    <MyText text={`Assignment ${index + 1}`} />
                  </View>
                );
              })}
            </>
          )}
        </View>
      </View>
      <AskMedia
        visible={showAskMedia}
        setVisibility={setShowAskMedia}
        nextFunction={imgs => {
          uploadAssignment(imgs);
        }}
      />
      <Loader visible={showLoader} />
    </View>
  );
};

export default AddAssignment;
