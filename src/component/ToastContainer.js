import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Ionicons } from './CustomIcons';
import { GlobalStyle } from '../globalStyle/GloblStyle';

const ToastContainer = ({heart,close}) => {
//   const progress = useProgress();

  return (
    <Toast
      config={{
        success: internalState => {
          return (
            <View
              style={[
                GlobalStyle.flexData,
                GlobalStyle.shadow,
                {
                  width: responsiveWidth(85),
                  backgroundColor: '#fff',
                  paddingVertical: responsiveHeight(2),
                  paddingHorizontal: responsiveWidth(4),
                  borderRadius: responsiveWidth(3),
                },
              ]}>
              <View
                style={{
                  backgroundColor: heart ? '#FF9B91' : '#5DD8D0',
                  padding: 7,
                  borderRadius: 100,
                }}>
                <View
                  style={{
                    backgroundColor: heart ? '#FF9B91' : 'white',
                    padding: 3,
                    borderRadius: 100,
                  }}>
                  <Ionicons
                    color={'black'}
                    iconName={heart ? 'heart' : close ? 'close' : 'checkmark'}
                    size={heart ? 17 : 8}
                  />
                </View>
              </View>
              <View
                style={{
                  marginLeft: responsiveWidth(4),
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 13,
                  }}>
                  {internalState.text1}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                  }}>
                  {internalState.text2}
                </Text>
              </View>
              {/* <ProgressBar
                progress={progress.position}
                buffered={progress.buffered}
              /> */}
            </View>
          );
        },
      }}
      position="top"
      type="success"
      visibilityTime={3000}
    />
  );
};

export default ToastContainer;

const styles = StyleSheet.create({});
