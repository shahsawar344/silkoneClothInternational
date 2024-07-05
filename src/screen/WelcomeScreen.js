import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import HeaderIcon from '../component/HeaderIcon';
import {GlobalStyle} from '../globalStyle/GloblStyle';
import CustomButton from '../component/CustomButton';
import {SignUpApiApi} from '../utils/services';
import {JustIcon} from '../component/CustomIcons';
import Animated, {BounceIn, BounceInDown} from 'react-native-reanimated';
import {BannerID} from '../utils/AdmobID';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const WelcomeScreen = ({navigation, route}) => {
  const code = route?.params ? route?.params : '';
  const FirstData = [
    {
      nav: 'AllData',
      text: 'View All',
      icon: require('../assets/containers.png'),
    },
    {nav: 'AddBill', text: 'Add BL', icon: require('../assets/truck.png')},
    {
      nav: 'AddDriverReport',
      text: 'Add Driver Report',
      icon: require('../assets/drivers.png'),
    },
    {
      nav: 'ViewDriverReport',
      text: 'View Driver Report',
      icon: require('../assets/report.png'),
    },
    {nav: 'VatTax', text: 'View All Tax', icon: require('../assets/tax.png')},
    {
      nav: 'CompanyName',
      text: 'Search by company Name',
      icon: require('../assets/company.png'),
    },
    {
      nav: 'VatTaxNumber',
      text: 'Search by VatTax number',
      icon: require('../assets/tax1.jpg'),
    },
    {
      nav: 'InvoiceNumber',
      text: 'Pay by Invoice Number',
      icon: require('../assets/search.png'),
    },
  ];
  const AnotherData = [
    {
      nav: 'AddDriverReport',
      text: 'Add Driver Report',
      icon: require('../assets/drivers.png'),
    },
    {
      nav: 'ViewDriverReport',
      text: 'View Driver Report',
      icon: require('../assets/report.png'),
    },
  ];
  const dataItem = code == '4408' ? FirstData : AnotherData;
  const AniImage = Animated.createAnimatedComponent(Image);
  const [randomNumber, setRandomNumber] = useState(null);
  const createRandom = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(randomNumber);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderIcon
        noIcon={true}
        marginLeft={responsiveWidth(35)}
        onPress={() => navigation.openDrawer()}
        text={'Manage'}
      />
      <View style={{paddingHorizontal: responsiveWidth(5), flex: 1}}>
        <TouchableOpacity
          style={{
            alignItems: 'flex-end',
            paddingTop: responsiveHeight(3),
            // marginRight: responsiveWidth(4),
          }}
          onPress={async () => {
            await AsyncStorage.clear();
            RNRestart.Restart();
          }}>
          <Text style={{color: 'black'}}>Clear Code</Text>
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View>
            {/* <CustomButton
              onPress={() => navigation.navigate('AllData')}
              buttonText={'View All'}
            />
            <CustomButton
              onPress={() => navigation.navigate('AddBill')}
              style={{marginTop: responsiveHeight(2)}}
              buttonText={'Add Bill No'}
            /> */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {dataItem.map((item, index) => (
                // <ImageBackground
                // source={require('../assets/tax1.jpg')}>
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    createRandom();
                    navigation.navigate(item.nav, {randomNumber});
                  }}
                  style={{
                    width: responsiveWidth(39),
                    height: responsiveWidth(35),
                    backgroundColor: '#00000010',
                    borderRadius: responsiveWidth(1.5),
                    margin: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: responsiveWidth(3),
                  }}>
                  <AniImage
                    resizeMode={'contain'}
                    source={item.icon}
                    style={{width: 75, height: 75}}
                    entering={BounceInDown.delay(100 * index).duration(900)}
                  />
                  {/* <Image
                    resizeMode="contain"
                    style={{width: 75, height: 75}}
                    source={item.icon}
                  /> */}
                  <Text
                    style={{fontSize: 12, color: 'black', textAlign: 'center'}}>
                    {item.text}
                  </Text>
                  {/* <Text style={{textAlign: 'center', color: 'black'}}>
                    {item.text}
                  </Text> */}
                </TouchableOpacity>
                // </ImageBackground>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
