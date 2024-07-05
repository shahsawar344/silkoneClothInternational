import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import VatTax from '../screen/VatTax';
import AllData from '../screen/AllData';
import DrawerNavigator from './Drawe/DrawerNavigator';
import WelcomeScreen from '../screen/WelcomeScreen';
import AddBill from '../screen/StackScreen/AddBill';
import ViewDetailBill from '../screen/StackScreen/ViewDetailBill';
import AddDriverReport from '../screen/driverReport/AddDriverReport';
import ViewDriverReport from '../screen/driverReport/ViewDriverReport';
import ViewOneDriver from '../screen/driverReport/ViewOneDriver';
import CompanyName from '../screen/Search/CompanyName';
import VatTaxNumber from '../screen/Search/VatTaxNumber';
import InvoiceNumber from '../screen/Search/InvoiceNumber';
import Starting from '../Starting';
import {GetAllDriverReport} from '../utils/services';
import {useDispatch} from 'react-redux';
import {driverDataId} from '../redux/Action';

const StackNavigation = () => {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  const GetDriverData = async () => {
    try {
      const result = await GetAllDriverReport();
      // console.log(result, 'new thing');
      if (result.status == true) {
        dispatch(driverDataId(result.result));
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetDriverData();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Starting">
        <Stack.Screen name="Starting" component={Starting} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="AllData" component={AllData} />
        <Stack.Screen name="VatTax" component={VatTax} />
        {/* <Stack.Screen name="Drawer" component={DrawerNavigator} /> */}
        <Stack.Screen name="AddBill" component={AddBill} />
        <Stack.Screen name="AddDriverReport" component={AddDriverReport} />
        <Stack.Screen name="ViewOneDriver" component={ViewOneDriver} />
        <Stack.Screen name="ViewDriverReport" component={ViewDriverReport} />
        <Stack.Screen name="CompanyName" component={CompanyName} />
        <Stack.Screen name="VatTaxNumber" component={VatTaxNumber} />
        <Stack.Screen name="InvoiceNumber" component={InvoiceNumber} />

        <Stack.Screen name="ViewDetailBill" component={ViewDetailBill} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
