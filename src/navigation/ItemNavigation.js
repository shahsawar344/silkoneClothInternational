import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AllDataItem from '../screen/ItemData/AllDataItem';
import FetchData from '../screen/ItemData/FetchData';
import AddItem from '../screen/ItemData/AddItem';
import DetailOfItem from '../screen/ItemData/DetailOfItem';

const ItemNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="AllDataItem">
      <Stack.Screen name="AllDataItem" component={AllDataItem} />
      <Stack.Screen name="FetchData" component={FetchData} />
      <Stack.Screen name="AddItem" component={AddItem} />
      <Stack.Screen name="DetailOfItem" component={DetailOfItem} />
      {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
    </Stack.Navigator>
  );
};

export default ItemNavigation;

const styles = StyleSheet.create({});
