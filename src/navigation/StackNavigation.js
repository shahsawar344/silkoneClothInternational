import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartUp from '../StartUp';
import Dashboard from '../screen/Dashboard';
import ItemNavigation from './ItemNavigation';
import FinancialNavigation from './FinancialNavigation';

const StackNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="StartUp">
          <Stack.Screen name='StartUp' component={StartUp} />
          <Stack.Screen name='Dashboard' component={Dashboard} />
          <Stack.Screen name='ItemData' component={ItemNavigation} />
          <Stack.Screen name='FinancialNavigation' component={FinancialNavigation} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
