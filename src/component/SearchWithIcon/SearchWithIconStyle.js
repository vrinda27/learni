import {StyleSheet} from 'react-native';
import { YELLOW,LIGHT_PURPLE } from '../../global/Color';
export const styles = StyleSheet.create({
  searchContainer: {
    width:'98%',
    alignSelf:'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    zIndex: 2,
    backgroundColor: 'white',  // Ensure background is set
    borderRadius: 10, // Optional for rounded corners

    // iOS Shadow
    shadowColor: '#000', // Black shadow
    shadowOffset: { width: 0, height: 8 }, // Matches "0px 8px"
    shadowOpacity: 0.08, // 0D in hex = ~5%–8% opacity
    shadowRadius: 13, // Matches "13px" blur effect

    // Android Shadow
    elevation: 8, // Adjust as needed
   
  },
  inputStyle: {
    height: 60,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 5,
    fontSize: 14,
    color: 'black',
    width: '80%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 2,
    borderWidth:1,
    borderColor:LIGHT_PURPLE,

  },
  iconView: {
    height: 60,
    width: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: YELLOW,
    width: '18%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 2,
  },
  dot:{
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'black',
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
  }
});