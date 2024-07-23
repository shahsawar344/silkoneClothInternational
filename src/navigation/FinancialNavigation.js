import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AllDataItem from '../screen/ItemData/AllDataItem';
import FinancialData from '../screen/financialReport/FinancialData';

const FinancialNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="FinancialData">
      <Stack.Screen name="FinancialData" component={FinancialData} />
      {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
    </Stack.Navigator>
  );
};

export default FinancialNavigation;

const styles = StyleSheet.create({});
