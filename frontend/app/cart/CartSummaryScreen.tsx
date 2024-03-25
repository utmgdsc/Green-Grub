import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {CartTabStackParamList} from './CartTab';

type CartSummaryScreenProps = StackScreenProps<
  CartTabStackParamList,
  'Cart Summary'
>;

export default function LoginScreen({}: CartSummaryScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Your empty cart</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'gray',
  },
});
