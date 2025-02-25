import {Platform, StyleSheet} from 'react-native';
import {height, width} from '../../../global/Constant';
import { dimensions } from '../../global/Constants';
import { DARK_PURPLE, GREEN, LIGHT_PURPLE } from '../../global/Color';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  mainView: {
    padding: 20,
    paddingTop: 0,
    marginTop: -30,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  courseTypeContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 2,
  width:'auto',
  height:'auto',
  borderRadius:27
  },
  crseImg: {
    height: 232,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crtrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  middleLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewAll: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 2,
    borderColor:LIGHT_PURPLE,
    borderWidth:1
  },
  reviewTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewTopLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewImg: {
    height: 31,
    width: 31,
    borderRadius: 31 / 2,
  },
  createImgStyle: {
    height: 13,
    width: 13,
    borderRadius: 13 / 2,
  },
  innerContainer:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:dimensions.SCREEN_WIDTH*0.84,paddingVertical:8},
  chapterContainer:{
    width:dimensions.SCREEN_WIDTH*0.90,
    height:98,
    borderRadius:10,
    borderColor:LIGHT_PURPLE,
    borderWidth:1,
    backgroundColor:'white',
    marginVertical:6
  
  },
  chapterContainerow:{

  },
  serialContainer:{
    width:28,
    height:28,
    borderRadius:23,
    backgroundColor:GREEN,
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    marginHorizontal:12
  },
  chapterTitleView:{width:'auto',height:28,borderColor:DARK_PURPLE,borderWidth:1,borderRadius:32,justifyContent:'center',paddingHorizontal:12},
  ratingCotainer:{width:dimensions.SCREEN_WIDTH*0.90,height:90,borderColor:LIGHT_PURPLE,
    borderWidth:1,
    borderRadius:10,
    marginVertical:12,
    flexDirection:'row',
   justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:12
  },
  buttonReview:{
    width:142,
    height:40,
    borderRadius:5,
    backgroundColor:DARK_PURPLE,
    borderWidth:1,
    borderColor:LIGHT_PURPLE,
    justifyContent:'center',
    alignItems:'center',
    marginRight:-5
  }
});