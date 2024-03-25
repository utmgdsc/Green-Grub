import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';
import {createStackNavigator} from '@react-navigation/stack';
import CartSummaryScreen from './CartSummaryScreen';

type HomeScreenProps = BottomTabScreenProps<MainTabsParamList, 'Cart Tab'>;

export type CartTabStackParamList = {
  'Cart Summary': undefined;
};

const Stack = createStackNavigator<CartTabStackParamList>();

export default function CartTab({}: HomeScreenProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart Summary" component={CartSummaryScreen} />
    </Stack.Navigator>
  );
}
