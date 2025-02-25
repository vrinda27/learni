
import {StyleSheet} from 'react-native';
import { dimensions } from '../../global/Constants';
// import {height, width} from '../../global/Constant';

export const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: dimensions.SCREEN_WIDTH,
    // height: 134,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom:"10%",
    // alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#545454',
  },
  container: {
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 10,
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
  },
  blurView: {
    flex: 1,
  },
  mainView: {
    padding: 20,
    // margin: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: dimensions.SCREEN_HEIGHT / 2 - 40,
    width: 593,
    height: 117,
    borderColor: '#545454',
    borderWidth: 1,
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 37,
  },
  textArea: {
    height: 120,
    justifyContent: 'flex-start',
    // paddingBottom: 93,
    marginBottom: 15,
    color: 'black',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    paddingLeft: 20,
    marginTop: 5,
  },
});