import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CartOverviewScreen from './CartsOverviewScreen';

export type CartStackParamList = {
  Carts: undefined;
};

const CartStackNavigator = createStackNavigator<CartStackParamList>();

const ExploreTab = () => {
  return (
    <CartStackNavigator.Navigator>
      <CartStackNavigator.Screen name="Carts" component={CartOverviewScreen} />
    </CartStackNavigator.Navigator>
  );
};

export default ExploreTab;
