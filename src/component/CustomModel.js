import {Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../globalStyle/GloblStyle';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CustomButton from './CustomButton';
import { Ionicons } from './CustomIcons';

export const CustomModel = ({children, selectItem, open, close}) => {
  return (
    <Modal
      visible={open}
      transparent={true}
      onRequestClose={close}
      animationType="fade">
      <View style={{backgroundColor: '#00000030', flex: 1}}>
        <View style={[GlobalStyle.flexEnd, {}]}>
          <View
            style={{
              paddingTop: responsiveHeight(2),
              borderTopLeftRadius: responsiveWidth(5),
              borderTopRightRadius: responsiveWidth(5),
              backgroundColor: 'white',
              paddingHorizontal: responsiveWidth(6),
              paddingBottom: responsiveHeight(8),
            }}>
            {!selectItem && (
              <View style={GlobalStyle.flexJustify}>
                <Text
                  style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                  Set file name
                </Text>
                <Ionicons iconName={'close'} onPress={close} />
              </View>
            )}
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};
export const CustomModelDelete = ({children, onPress, title, open, close}) => {
  return (
    <Modal
      visible={open}
      transparent={true}
      onRequestClose={close}
      animationType="fade">
      <View style={{backgroundColor: '#00000090', flex: 1}}>
        <View style={[GlobalStyle.flexCenter]}>
          <View
            style={{
              paddingVertical: responsiveHeight(2),
              borderRadius: responsiveWidth(4),
              backgroundColor: 'white',
              // paddingHorizontal: responsiveWidth(6),
              width: responsiveWidth(100),
              flex:1
              // alignItems: 'center',
            }}>
              {children}
            {/* <Text style={{color: '#06ABEB', fontSize: responsiveFontSize(3)}}>
              Confirmation
            </Text>
            <Text
              style={{
                color: 'gray',
                fontSize: responsiveFontSize(1.9),
                marginVertical: responsiveHeight(2),
              }}>
              Do you want to delete this {title}
            </Text>
            <View style={GlobalStyle.flexJustify}>
              <CustomButton
                mode="outlined"
                buttonText={'Cancel'}
                onPress={close}
                colorText="gray"
                buttonColor="transparent"
                paddingVertical={2}
                borderColor={'gray'}
                borderRadius={responsiveWidth(5)}
              />
              <CustomButton
                mode="outlined"
                buttonText={'Delete'}
                onPress={onPress}
                style={{marginLeft: responsiveWidth(5)}}
                buttonColor="red"
                paddingVertical={2}
                borderColor={'gray'}
                borderRadius={responsiveWidth(5)}
              />
            </View> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});
