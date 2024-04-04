import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ScanScreen from './ScanScreen';
import ProductInformationScreen from './ProductInformationScreen';

export type ScanStackParamList = {
  Scan: undefined;
  'Product Information': {barcode: string};
};

const Stack = createStackNavigator<ScanStackParamList>();

export default function App(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#fdfdfd'},
      }}>
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen
        name="Product Information"
        component={ProductInformationScreen}
      />
    </Stack.Navigator>
  );
}
