import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';

type StartScreenProps = BottomTabScreenProps<MainTabsParamList, 'Scan'>;

export default function ScanScreen({}: StartScreenProps) {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
