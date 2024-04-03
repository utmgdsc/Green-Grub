import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import MainButton from '../shared/MainButton';
import {useIsFocused} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {ScanStackParamList} from './ScanTab';

type StartScreenProps = StackScreenProps<ScanStackParamList, 'Scan'>;

export default function ScanScreen({navigation}: StartScreenProps) {
  const {hasPermission, requestPermission} = useCameraPermission();
  const camActive = useIsFocused();

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13'],
    onCodeScanned: codes => {
      if (codes.length > 0 && codes[0].value) {
        navigation.navigate('Product Information', {barcode: codes[0].value});
      }
    },
  });

  const cameraDevice = useCameraDevice('back');

  return (
    <View style={styles.container}>
      {hasPermission && cameraDevice ? (
        <Camera
          key="barcode"
          onError={error => console.error(error)}
          codeScanner={codeScanner}
          device={cameraDevice}
          isActive={camActive}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: '100%', height: '60%'}}
        />
      ) : hasPermission ? (
        <Text>No back camera available</Text>
      ) : (
        <MainButton title="Allow Camera Usage" onPress={requestPermission} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  receiptContainer: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
