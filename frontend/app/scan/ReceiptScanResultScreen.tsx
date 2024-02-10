import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';
import MainButton from '../shared/MainButton';

type ScanResultScreenProps = StackScreenProps<
  RootStackParamList,
  'Receipt Scan Result'
>;

export default function ScanResultScreen({
  navigation,
  route,
}: ScanResultScreenProps) {
  return (
    <View style={styles.container}>
      <Text>{route.params.path}</Text>
      <MainButton title="Go back" onPress={() => navigation.goBack()} />
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
});
