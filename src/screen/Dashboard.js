import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../globalStyle/GloblStyle';
import CustomButton from '../component/CustomButton';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Dashboard = ({navigation, route}) => {
  const itemData = [
    {name: 'Item Detail', nav: 'ItemData'},
    {name: 'Financial Report', nav: 'FinancialNavigation'},
  ];
  return (
    <View style={GlobalStyle.mainContainer}>
      <View style={GlobalStyle.flexCenter}>
        {itemData?.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              style={{
                width: responsiveWidth(45),
                height: responsiveWidth(45),
                borderRadius: responsiveWidth(4),
                borderWidth: 0.4,
                borderColor: 'gray',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: responsiveHeight(2),
                backgroundColor: 'white',
              }}
              onPress={() => navigation.navigate(item.nav)}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontFamily: 'Poppins-Regular',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
