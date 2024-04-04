import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CartOverviewScreen from './CartsOverviewScreen';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';
import CartInfoScreen from './CartInfoScreen';

type CartScreenProps = BottomTabScreenProps<MainTabsParamList, 'Cart Tab'>;

export type CartStackParamList = {
  Carts: undefined;
  'Cart Details': {cartId: number};
};

const CartStackNavigator = createStackNavigator<CartStackParamList>();

const ExploreTab = ({}: CartScreenProps) => {
  return (
    <CartStackNavigator.Navigator>
      <CartStackNavigator.Screen
        name="Carts"
        component={CartOverviewScreen}
        options={{title: ''}}
      />
      <CartStackNavigator.Screen
        name="Cart Details"
        component={CartInfoScreen}
        options={{title: ''}}
      />
    </CartStackNavigator.Navigator>
  );
};

export default ExploreTab;
