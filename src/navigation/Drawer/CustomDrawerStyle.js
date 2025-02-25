import colors from '../../global/Constants'
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // color: Colors.LITE_GREY,
        backgroundColor: 'white',
    },
    mainView: {
        // paddingTop: 30,
        // paddingBottom: 60,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // backgroundColor: '#ffffff',
        // justifyContent: 'center'
        backgroundColor:'white'
    },
    logoCloseView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    logoImageStyle: {
        height: 70,
        width: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 2,
        borderRadius: 5,
    },
    profileCardView: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        padding: 10,
        backgroundColor: '#ffffff',
        marginVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    profileImageStyle: {
        height: 70,
        width: 70,
        borderRadius: 100,
        alignSelf: 'center',
    },
    imageNameView: {
        // alignItems: 'center',
    },
    flexRowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    // logoImage: {width: 127, height: 127, borderRadius: 50},
    crossImage: { width: 46, height: 46, marginRight: 10 },
    menuContainer: {
        flexDirection: 'row',
        marginTop: 25,
        width: '100%',
    },
    menuImage: { width: 20, height: 18 },
    image: {
        width: 160,
        height: (160 * 120) / 200,
    },
    socialMediaContainer: {
        backgroundColor: colors.gold,
        padding: 22,
        paddingBottom: 28,
        marginTop: 30,
    },
    socialRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    followText: {
        fontSize: 12,
        fontWeight: '400',
        color:'red'
    },
    versionText: {
        fontSize: 12,
        fontWeight: '400',
        color: 'grey',
        padding: 20,
    },
    overflowView: {
        backgroundColor: 'red', zIndex: 9, position: 'absolute', height: 91, top: 100, borderRadius: 15, alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',


    },
    appLogo: {
        width: '100%',
        height: 120,
        resizeMode: 'contain',
      },
      profileView: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      
        height: 90,
        backgroundColor: '#D7BC70',

       
      },
      profile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      },
      profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 10,
      },
      info: {
        flexDirection: 'column',
      },
      profileName: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
      },
      profileEmail: {
        color: 'white',
        fontSize: 14,
        fontWeight: '400',
      },
      submitButton: {
        backgroundColor: '#D7BC70',
        width: 90,
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
      gradientBackground: {
        width: 'auto',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        padding:10
      },
      infoView: {
        padding: 20,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 10,
      },
      text: {
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
      },
      socialMedia: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#D7BC70',
        borderBottomWidth: 1,
        borderBottomColor: '#D7BC70',
        marginTop: 20,
        gap: 20,
      },
      iconRow: {
        flexDirection: 'row',
        gap: 10,
      },
});
