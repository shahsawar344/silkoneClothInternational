import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Drawer} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {GlobalColor} from '../../Color/GlobalColor';
import {GlobalStyle} from '../../globalStyle/GloblStyle';

const CustomDrawer = props => {
  const Remove = async () => {
    try {
      await AsyncStorage.removeItem('userID');
      await AsyncStorage.removeItem('userPassword');
      await AsyncStorage.removeItem('token');
      props.navigation.navigate('Auth', {screen: 'Login'});
    } catch (error) {
      console.error(error);
    }
  };
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState([]);
  const focus = useIsFocused();
  const GetUser = async () => {
    try {
      const result = await GetUserApi(token, id);
      // console.log('🚀  file: CustomDrawer.js:40  GetUser  result:', result);
      if (result.status == true) {
        setLoading(false);
        setGetData(result.result[0]);
      } else {
        setLoading(false);
        console.error(result.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const [check, setCheck] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <DrawerContentScrollView
        style={{flex: 1}}
        {...props}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{marginTop: responsiveHeight(10), alignSelf: 'center'}}>
              <View
                style={{
                  width: responsiveWidth(30),
                  height: responsiveWidth(30),
                  borderRadius: responsiveHeight(50),
                  borderWidth: 1,
                  borderColor: 'gray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'black'}}>new</Text>
              </View>
            </View>
            {/* <View style={{alignItems: 'center'}}>
              <Text style={{color: 'black', marginTop: responsiveHeight(1)}}>
                {getData?.name ? getData?.name : 'No name'}
              </Text>
              <TouchableOpacity
                style={{paddingVertical: responsiveHeight(1)}}
                onPress={() =>
                  props.navigation.navigate('EditProfile', {getData})
                }>
                <Text style={{color: GlobalColor.appColor}}>Edit Profile</Text>
              </TouchableOpacity>
            </View> */}
          </View>
          <Drawer.Section style={styles.drawerSection} showDivider={false}>
            <DrawerItem
              label={'View All Number'}
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('WelcomeScreen');
              }}
            />
            <DrawerItem
              label={'Vat Text'}
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('VatTax');
              }}
            />
            <DrawerItem
              label={'History'}
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('MyMedia');
              }}
            />
            {/* <DrawerItem
              label={'Terms of services'}
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('Terms');
              }}
            />
            <DrawerItem
              label={'Privacy Policy'}
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('Privacy');
              }}
            /> */}
            {/* <DrawerItem
              label={'Go Premium'}
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('GoPremium');
              }}
            /> */}
          </Drawer.Section>
        </View>
        {/* <Drawer.Section style={GlobalStyle.flexEnd} showDivider={false}> */}
        {/* </Drawer.Section> */}
      </DrawerContentScrollView>
      {/* <TouchableOpacity
        style={{
          borderRadius: responsiveWidth(8),
          paddingVertical: responsiveHeight(1.5),
          paddingHorizontal: responsiveWidth(10),
          alignSelf: 'center',
          alignItems: 'center',
          marginBottom: responsiveHeight(1),
        }}>
        <Text
          style={{
            color: '#FF9B91',
            fontSize: responsiveHeight(1.6),
            fontWeight: 'bold',
          }}>
          Log out
        </Text>
      </TouchableOpacity> */}
      {/* <CustomModal
        modalVisible={modalVisible}
        CloseModal={() => setModalVisible(false)}
        Icon={appImages.confirm}
        text={TranslationStrings.CONFIRMATION}
        type={"confirmation"}
        subtext={TranslationStrings.DO_YOU_REALLY_WANT_TO_LOGOUT}
        buttontext={TranslationStrings.YES}
        buttontext1={TranslationStrings.CANCEL}
        onPress={() => {
          setModalVisible(false);
        }}
        onPress1={() => {
          logout();
        }}
      /> */}
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: '#404040',
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  drawerSection: {
    marginTop: responsiveHeight(9),
  },
  drawerContent: {
    flex: 1,
    // width: responsiveHeight(40),
  },
});
