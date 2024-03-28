import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CartOverviewScreen from './CartsOverviewScreen';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';

type CartScreenProps = BottomTabScreenProps<MainTabsParamList, 'Cart Tab'>;

export type CartStackParamList = {
  Carts: undefined;
};

const CartStackNavigator = createStackNavigator<CartStackParamList>();

const ExploreTab = ({}: CartScreenProps) => {
  return (
    <CartStackNavigator.Navigator screenOptions={{headerShown: false}}>
      <CartStackNavigator.Screen name="Carts" component={CartOverviewScreen} />
    </CartStackNavigator.Navigator>
  );
};

export default ExploreTab;
