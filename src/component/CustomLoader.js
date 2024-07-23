import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../globalStyle/GloblStyle';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const CustomLoader = () => {
  return (
    <View style={[GlobalStyle.flexCenter]}>
      <Image
        resizeMode="contain"
        source={require('../assets/ticker.gif')}
        style={{
          width: responsiveWidth(50),
          height: responsiveWidth(50),
        //   tintColor: 'black',
        }}
      />
    </View>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({});
