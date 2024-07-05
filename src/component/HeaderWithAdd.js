import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../globalStyle/GloblStyle';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Ionicons} from './CustomIcon';
import {fontFamily} from '../FontFamily/FontFamily';

const HeaderWithAdd = ({
  text,
  iconName,
  iconNameRight,
  iconNameSearch,
  onPressAdd,
  onPressRight,
  onPressSearch,marginBottom
}) => {
  return (
    <View
      style={[
        GlobalStyle.flexJustify,
        {
          paddingTop: Platform.OS == 'android' && responsiveHeight(4),
          paddingBottom: Platform.OS == 'android' && responsiveHeight(4),
          marginBottom:marginBottom?marginBottom: responsiveHeight(6.5),
        },
      ]}>
      <View style={[GlobalStyle.flexData]}>
        <Ionicons size={19} onPress={onPressRight} iconName={iconNameRight} />
        <Text
          style={{
            color: 'black',
            fontSize: responsiveFontSize(2.7),
            fontFamily: fontFamily.sfPro,
            fontWeight: 'bold',
            marginLeft: responsiveWidth(5),
          }}>
          {text}
        </Text>
      </View>
      <View style={[GlobalStyle.flexData]}>
        <View
          onPress={onPressAdd}
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 300,
            padding: 1,
            marginRight: responsiveWidth(5),
          }}>
          <Ionicons iconName={iconName} size={19} onPress={onPressAdd} />
        </View>
        <Ionicons iconName={iconNameSearch} size={23} onPress={onPressSearch} />
      </View>
    </View>
  );
};

export default HeaderWithAdd;

const styles = StyleSheet.create({});
