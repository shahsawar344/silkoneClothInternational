import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GlobalStyle} from './globalStyle/GloblStyle';
import CustomButton from './component/CustomButton';

const StartUp = ({navigation}) => {
  return (
    <View
      style={[GlobalStyle.flexCenter, {backgroundColor: 'rgb(186,228,234)'}]}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={false}
        backgroundColor={'rgb(186,228,234)'}
        animated={true} 
      />
      <View style={{}}>
        <Image
          source={require('../src/assets/logo.png')}
          style={{width: 300, height: 300}}
          resizeMode="contain"
        />
      </View>
      <CustomButton
        onPress={() => navigation.navigate('Dashboard')}
        buttonText={`Let's Start`}
        buttonColor={'white'}
        colorText={'black'}
      />
    </View>
  );
};

export default StartUp;

const styles = StyleSheet.create({});
