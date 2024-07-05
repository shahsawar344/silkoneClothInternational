import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {GlobalStyle} from '../globalStyle/GloblStyle';
import {GlobalColor} from '../Color/GlobalColor';
import {Ionicons} from './CustomIcons';

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  paddingVertical,
  leftIcon,
  rightIcon,
  style,
  enableIcon,
  offIcon,
  noIcon,
  disabled,
  fontWeight,
  numLine,
  iconName,
  keyboardType,
  multiline,
  height,
  onPressRightIcon,
  bgColor,
  fontSize,
  rightIconNone,
  marginVertical,
  borderRadius,
  maxLength,
  autoCapitalize,
  onSubmitEditing,
  autoFocus,
  titleName,
  ref,
  color,
  placeholderText,
  onPressRightImage,
  onPressClose,
  iconClose,
  colorText,
}) => {
  const [showIcon, setShowIcon] = useState(true);
  return (
    <View>
      {titleName && (
        <View style={GlobalStyle.flexJustify}>
          <Text
            style={{
              color: colorText ? colorText : GlobalColor.textColor,
            }}>
            {titleName}
          </Text>
          {iconClose && (
            <Ionicons
              onPress={onPressClose}
              color={'black'}
              iconName={iconName ? iconName : 'close'}
            />
          )}
        </View>
      )}
      <TextInput
        ref={ref}
        autoFocus={autoFocus}
        onSubmitEditing={onSubmitEditing}
        keyboardType={keyboardType}
        numberOfLines={numLine}
        disabled={disabled}
        multiline={multiline}
        maxLength={maxLength}
        selectionColor="black"
        cursorColor="black"
        placeholder={placeholder}
        // placeholder={placeholderText}s
        value={value}
        autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
        contentStyle={{height: height ? height : responsiveHeight(5)}}
        outlineStyle={{
          borderRadius: borderRadius ? borderRadius : responsiveHeight(0.9),
          borderColor: '#00000009',
          height: height ? height : responsiveHeight(5),
        }}
        mode="outlined"
        secureTextEntry={enableIcon && showIcon ? true : false}
        onChangeText={onChangeText}
        style={[
          style,
          {
            backgroundColor: bgColor ? bgColor : '#dbdcdd',
            // marginVertical: marginVertical ? marginVertical : 5,
            // paddingVertical: paddingVertical ? paddingVertical : 0,
            fontWeight: fontWeight ? fontWeight : '500',
            fontSize: fontSize ? fontSize : 14,
            letterSpacing: 0.4,
            paddingLeft: responsiveWidth(1.4),
          },
        ]}
        textColor={color ? color : 'black'}
        placeholderTextColor={'gray'}
        left={
          !noIcon && (
            <TextInput.Icon
              icon={() => (
                <Icon
                  style={{marginBottom: 20}}
                  name={leftIcon}
                  size={23}
                  color="black"
                />
              )}
            />
          )
        }
        right={
          rightIcon ? (
            <TextInput.Icon
              onPress={
                onPressRightIcon
                  ? onPressRightIcon
                  : () => setShowIcon(!showIcon)
              }
              icon={() => (
                <View style={{marginBottom: 20}}>
                  {/* <TouchableOpacity
                    onPress={
                      onPressRightIcon
                        ? onPressRightIcon
                        : () => setShowIcon(!showIcon)
                    }> */}
                  <Icon
                    name={!showIcon ? offIcon : rightIcon}
                    size={19}
                    color="black"
                  />
                  {/* </TouchableOpacity> */}
                </View>
              )}
            />
          ) : (
            rightIconNone && (
              <TextInput.Icon
                icon={() => (
                  <TouchableOpacity
                    onPress={onPressRightImage}></TouchableOpacity>
                )}
              />
            )
          )
        }
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
