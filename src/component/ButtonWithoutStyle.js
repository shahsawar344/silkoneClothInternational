import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const ButtonWithoutStyle = ({text,onPress, backgroundColor, color}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(3),
        borderRadius: responsiveWidth(10),
        backgroundColor: backgroundColor ? backgroundColor : '#06ABEB',
      }}>
      <Text style={{color: color, fontSize: 13}}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
