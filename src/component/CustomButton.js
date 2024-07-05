import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {GlobalColor} from '../Color/GlobalColor';

const CustomButton = ({
  onPress,
  iconColor,
  borderRadius,
  buttonText,
  style,
  iconName,
  mode,
  buttonColor,
  fontWeight,
  size,
  colorText,
  paddingVertical,
  styleText,
  borderColor,
  imageIcon,
  heightButton,
  loading,
  marginLeft,
  width,
  disabled,
  rippleColor,
}) => {
  return (
    <Button
      loading={loading}
      rippleColor={rippleColor}
      disabled={disabled}
      icon={() =>
        imageIcon ? (
          imageIcon
        ) : (
          <Icon
            name={iconName}
            size={size ? size : 23}
            color={iconColor ? iconColor : 'green'}
          />
        )
      }
      style={[
        style,
        {
          borderRadius: borderRadius ? borderRadius : responsiveHeight(1.8),
          borderColor: borderColor ? borderColor : '#00000020',
          backgroundColor: buttonColor ? buttonColor : GlobalColor.buttonColor,
          height: heightButton,
          width: width,
        },
      ]}
      mode={mode ? mode : 'contained'}
      labelStyle={[
        ,
        styleText,
        {
          paddingVertical: paddingVertical,
          marginLeft: marginLeft,
          letterSpacing: 0.6,
          // textTransform: 'capitalize',
        },
      ]}
      onPress={onPress}>
      <Text
        style={{
          fontWeight: 'bold',
          color: colorText ? colorText : 'white',
        }}>
        {buttonText}
      </Text>
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
