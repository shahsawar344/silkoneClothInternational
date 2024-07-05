import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const GlobalStyle = StyleSheet.create({
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexJustify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  flexEnd: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  flexEndAlign: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  centerSomething: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveHeight(10),
  },
});
