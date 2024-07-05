import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontis from 'react-native-vector-icons/Fontisto';

export const Ionicons = ({onPress, size, style,iconName, color, disabled}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={disabled}>
      <Icon
        name={iconName ? iconName : 'chevron-back'}
        size={size ? size : 23}
        color={color ? color : 'black'}
      />
    </TouchableOpacity>
  );
};
export const JustIcon = ({size, iconName, color, disabled}) => {
  return (
    <Icon
      name={iconName ? iconName : 'chevron-back'}
      size={size ? size : 23}
      color={color ? color : 'black'}
    />
  );
};
export const Fontisto = ({size, iconName, color, disabled}) => {
  return (
    <Fontis
      name={iconName ? iconName : 'chevron-back'}
      size={size ? size : 23}
      color={color ? color : 'black'}
    />
  );
};
const styles = StyleSheet.create({});
