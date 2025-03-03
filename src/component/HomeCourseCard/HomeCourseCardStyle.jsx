import {dimensions} from 'global/Constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  courseContainer: {
    width: (dimensions.SCREEN_WIDTH - 40) * 0.66,

    borderRadius: 10,
    backgroundColor: 'white',
    marginRight: 16,
    // shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.05,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'black',
  },
  crseImg: {
    height: 167,
    width: (dimensions.SCREEN_WIDTH - 40) * 0.65,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 5,
    paddingVertical: 4,
  },
  courseNameView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
