import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../globalStyle/GloblStyle';
import HeaderIcon from '../../component/HeaderIcon';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {JustIcon} from '../../component/CustomIcons';

const AllDataItem = ({navigation, route}) => {
  const companyData = [
    {name: 'Grace', nav: 'grace'},
    // {name: 'Peshawar', nav: 'grace'},
    // {name: 'afridi', nav: 'grace'},
    // {name: 'punjabi', nav: 'grace'},
    // {name: 'nowshera', nav: 'grace'},
    // {name: 'attock', nav: 'grace'},
    // {name: 'mardan', nav: 'grace'},
    // {name: 'shutrah', nav: 'grace'},
  ];
  return (
    <View style={GlobalStyle.mainContainer}>
      <HeaderIcon text={'All Item Data'} marginLeft={responsiveWidth(26)} />
      <View style={{flex: 1, paddingHorizontal: responsiveWidth(5)}}>
        <View
          style={{
            backgroundColor: '#00000020',
            marginTop: responsiveHeight(2),
            borderRadius: 10,
            paddingVertical: responsiveHeight(2),
            paddingHorizontal: responsiveWidth(3),
          }}>
          <Text style={{fontSize: 13, color: 'black', letterSpacing: 2}}>
            Hello, Ameer Al Khadim
          </Text>
          <Text style={{fontSize: 24, color: 'black', fontWeight: '700'}}>
            Hey what are you looking for Item
          </Text>
        </View>
        <View style={{marginVertical: responsiveHeight(2)}}>
          <View
            style={{
              backgroundColor: '#A5C14B',
              paddingVertical: responsiveHeight(2),
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontFamily: 'Poppins-Italic',
              }}>
              Company's
            </Text>
          </View>
          <View
            style={{
              // flexDirection: 'row',
              // alignItems: 'center',
              flexWrap: 'wrap',
              marginTop: responsiveHeight(3),
            }}>
            {companyData.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  // GlobalStyle.flexData,
                  {
                    paddingHorizontal: responsiveWidth(15),
                    paddingVertical: responsiveHeight(0.7),
                    // borderWidth: 1,
                    // borderColor: '#CBE184',
                    borderRadius: responsiveWidth(4),
                    // marginRight: responsiveWidth(1),
                    marginVertical: responsiveHeight(0.7),
                    // marginHorizontal: responsiveWidth(1),
                    backgroundColor: 'white',
                  },
                ]}
                onPress={() => {
                  navigation.navigate('FetchData', item);
                }}>
                {/* <JustIcon iconName={'shirt-outline'} size={19} /> */}
                <Text
                  style={{
                    color: 'black',
                    marginLeft: responsiveWidth(2),
                    fontFamily: 'Poppins-Regular',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default AllDataItem;

const styles = StyleSheet.create({});
