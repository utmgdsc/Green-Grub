import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';

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
      <Image
        source={{uri: 'file://' + route.params.path}}
        style={{width: '100%', height: '70%'}}
      />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
