import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Ionicons} from './CustomIcons';
import {GlobalStyle} from '../globalStyle/GloblStyle';
import {useNavigation} from '@react-navigation/native';

const HeaderIcon = ({
  text,
  fontSize,
  style,
  onPress,
  marginLeft,
  iconName,
  buttonThird,noIcon
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        GlobalStyle.flexData,
        GlobalStyle.shadow,
        {
          paddingVertical: Platform.OS == 'android' && responsiveHeight(2),
          backgroundColor: 'white',
          paddingHorizontal: responsiveWidth(5),
          // marginBottom: marginBottom ? marginBottom : responsiveHeight(6.5),
        },
        style,
      ]}>
      {!noIcon && (
        <Ionicons
          iconName={iconName}
          size={26}
          onPress={onPress ? onPress : () => navigation.goBack()}
        />
      )}
      <Text
        style={{
          color: 'black',
          fontSize: fontSize ? fontSize : responsiveFontSize(2),
          fontWeight: 'bold',
          marginLeft: marginLeft ? marginLeft : responsiveWidth(11),
        }}>
        {text}
      </Text>
      {buttonThird}
    </View>
  );
};

export default HeaderIcon;

const styles = StyleSheet.create({});
