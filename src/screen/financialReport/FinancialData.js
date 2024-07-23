import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {GlobalStyle} from '../../globalStyle/GloblStyle';
import HeaderIcon from '../../component/HeaderIcon';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const FinancialData = ({navigation}) => {
  const dataReport = [
    {totalCharges: 3212, incoming: 3581, labor: 2212},
    {totalCharges: 3212, incoming: 3581, labor: 2212},
    {totalCharges: 3212, incoming: 3581, labor: 2212},
  ];
  return (
    <View style={GlobalStyle.mainContainer}>
      <HeaderIcon marginLeft={responsiveWidth(27)} text={'Financial Report'} />
      <View style={GlobalStyle.container}>
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

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
            Date: 07-July-204
          </Text>
          {dataReport.map((item, i) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DetailOfItem', item);
              }}
              key={i}
              style={[
                {
                  backgroundColor: 'white',
                  borderRadius: responsiveHeight(2),
                  paddingVertical: responsiveHeight(1),
                  paddingHorizontal: responsiveWidth(2),
                  marginVertical: responsiveHeight(1),
                  marginHorizontal: 2,
                },
                GlobalStyle.shadow,
              ]}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  textTransform: 'uppercase',
                }}>
                Incoming Name:{' '}
                <Text
                  style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                  {item.incoming}
                </Text>
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  textTransform: 'uppercase',
                }}>
                Labor Name:{' '}
                <Text
                  style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                  {item.labor}
                </Text>
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  textTransform: 'uppercase',
                }}>
                Total Charges:{' '}
                <Text
                  style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                  {item.totalCharges}
                </Text>
              </Text>
            </TouchableOpacity>
          ))}
          <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
            Date: 06-July-204
          </Text>
          {Array.from({length: 1}).map((item, i) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DetailOfItem', item);
              }}
              key={i}
              style={[
                {
                  backgroundColor: 'white',
                  borderRadius: responsiveHeight(2),
                  paddingVertical: responsiveHeight(1),
                  paddingHorizontal: responsiveWidth(2),
                  marginVertical: responsiveHeight(1),
                  marginHorizontal: 2,
                },
                GlobalStyle.shadow,
              ]}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  textTransform: 'uppercase',
                }}>
                Incoming Name:{' '}
                <Text
                  style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                  131
                </Text>
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  textTransform: 'uppercase',
                }}>
                Labor Name:{' '}
                <Text
                  style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                  89
                </Text>
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  textTransform: 'uppercase',
                }}>
                Total Charges:{' '}
                <Text
                  style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                  2000
                </Text>
              </Text>
            </TouchableOpacity>
          ))}
          <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
            Date: 05-July-204
          </Text>
          {Array.from({length: 4}).map((item, i) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DetailOfItem', item);
              }}
              key={i}
              style={[
                {
                  backgroundColor: 'white',
                  borderRadius: responsiveHeight(2),
                  paddingVertical: responsiveHeight(1),
                  paddingHorizontal: responsiveWidth(2),
                  marginVertical: responsiveHeight(1),
                  marginHorizontal: 2,
                },
                GlobalStyle.shadow,
              ]}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  textTransform: 'uppercase',
                }}>
                Incoming Name:{' '}
                <Text
                  style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                  131
                </Text>
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  textTransform: 'uppercase',
                }}>
                Labor Name:{' '}
                <Text
                  style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                  89
                </Text>
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  textTransform: 'uppercase',
                }}>
                Total Charges:{' '}
                <Text
                  style={{color: 'black', fontSize: 12, fontWeight: 'bold'}}>
                  2000
                </Text>
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default FinancialData;

const styles = StyleSheet.create({});
