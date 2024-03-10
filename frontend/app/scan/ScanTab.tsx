import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ScanScreen from './ScanScreen';
import ProductInformationScreen from './ProductInformationScreen';
import ReceiptScanResultScreen from './ReceiptScanResultScreen';

export type ScanStackParamList = {
  Scan: undefined;
  'Product Information': {barcode: string};
  'Receipt Scan Result': {path: string};
};

const Stack = createStackNavigator<ScanStackParamList>();

export default function App(): React.JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen
        name="Product Information"
        component={ProductInformationScreen}
      />
      <Stack.Screen
        name="Receipt Scan Result"
        component={ReceiptScanResultScreen}
      />
    </Stack.Navigator>
  );
}
