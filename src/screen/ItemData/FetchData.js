import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../globalStyle/GloblStyle';
import HeaderIcon from '../../component/HeaderIcon';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {JustIcon} from '../../component/CustomIcons';
import CustomInput from '../../component/CustomInput';

const FetchData = ({navigation, route}) => {
  const item = route?.params ? route?.params : '';
  const categoryData = [
    {
      name: 'First',
      company: 'Grace',
      purchasing: 123,
      sale: 132,
      taan: 134,
      LotNo: '12ACEB!2',
      meter: 89,
    },
    {
      name: 'second',
      company: 'asdfas',
      purchasing: 1233,
      sale: 1302,
      taan: 1321,
      LotNo: 'adfae12!2',
      meter: 894,
    },
    {
      name: 'third',
      company: 'sgre',
      purchasing: 1223,
      sale: 1330,
      taan: 123,
      LotNo: '12ACEB!2',
      meter: 893,
    },
    {
      name: 'fourth',
      company: 'gsfdr',
      purchasing: 1123,
      sale: 1230,
      taan: 143,
      LotNo: '12ACEB!2',
      meter: 893,
    },
    {
      name: 'five',
      company: 'hgesa',
      purchasing: 13223,
      sale: 1330,
      taan: 132,
      LotNo: '12ACEB!2',
      meter: 898,
    },
  ];
  return (
    <View style={GlobalStyle.mainContainer}>
      <HeaderIcon
        text={`Category: ${item.name}`}
        marginLeft={responsiveWidth(26)}
      />

      <View style={GlobalStyle.container}>
        <CustomInput
          placeholder={'Search......'}
          style={{marginTop: 20}}
          rightIcon={'add'}
          noIcon={true}
          onPressRightIcon={() => {}}
        />
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          {categoryData.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DetailOfItem', item);
              }}
              key={index}
              style={[
                {
                  backgroundColor: 'rgb(168,228,234)',
                  borderRadius: responsiveHeight(2),
                  paddingVertical: responsiveHeight(1),
                  paddingHorizontal: responsiveWidth(2),
                  marginVertical: responsiveHeight(1),
                  marginHorizontal: 2,
                  borderWidth: 1,
                  borderColor: 'white',
                },
                GlobalStyle.shadow,
              ]}>
              <View style={GlobalStyle.flexJustify}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 10,
                    textTransform: 'uppercase',
                  }}>
                  Item Name:{' '}
                  <Text
                    style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                    {item.name}
                  </Text>
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 10,
                    textTransform: 'uppercase',
                  }}>
                  Company Name:{' '}
                  <Text
                    style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                    {item.company}
                  </Text>
                </Text>
              </View>
              <View style={GlobalStyle.flexJustify}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 10,
                    textTransform: 'uppercase',
                  }}>
                  Lot No:{' '}
                  <Text
                    style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                    {item.LotNo}
                  </Text>
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 10,
                    textTransform: 'uppercase',
                  }}>
                  Total Meter:{' '}
                  <Text
                    style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                    {item.meter}
                  </Text>
                </Text>
              </View>
              <View style={GlobalStyle.flexJustify}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 10,
                    textTransform: 'uppercase',
                  }}>
                  No Of Taan:{' '}
                  <Text
                    style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                    {item.taan}
                  </Text>
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 10,
                    textTransform: 'uppercase',
                  }}>
                  Purchasing Amount:{' '}
                  <Text
                    style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                    {item.purchasing}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={[GlobalStyle.absoluteStyle, {bottom: 10, right: 20}]}>
        <TouchableOpacity
          style={[
            {
              width: responsiveWidth(13),
              height: responsiveWidth(13),
              borderRadius: responsiveWidth(20),
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            },
            GlobalStyle.shadow,
          ]}
          onPress={() => {
            navigation.navigate('AddItem');
          }}>
          <JustIcon iconName={'add'} size={27} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FetchData;

const styles = StyleSheet.create({});
