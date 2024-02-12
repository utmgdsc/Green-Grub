import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';

type ScanResultScreenProps = StackScreenProps<
  RootStackParamList,
  'Barcode Scan Result'
>;

export default function ScanResultScreen({
  navigation,
  route,
}: ScanResultScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.scanResultText}>{route.params.barcode}</Text>
      <ButtonGroup>
        <MainButton title="Retake" onPress={() => navigation.goBack()} />
        <MainButton title="Record" />
      </ButtonGroup>
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
  scanResultText: {
    color: 'black',
  },
});
