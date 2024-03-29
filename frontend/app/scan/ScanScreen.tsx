import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import MainButton from '../shared/MainButton';
import {useIsFocused} from '@react-navigation/native';
import ModeSwitchButton from '../shared/ModeSwitchButton';
import {StackScreenProps} from '@react-navigation/stack';
import TriggerButton from '../shared/TriggerButton';
import {ScanStackParamList} from './ScanTab';

type StartScreenProps = StackScreenProps<ScanStackParamList, 'Scan'>;

export default function ScanScreen({navigation}: StartScreenProps) {
  const {hasPermission, requestPermission} = useCameraPermission();
  const camActive = useIsFocused();
  const [mode, setMode] = useState('Barcode');
  const receiptCamera = useRef<Camera>(null);

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13'],
    onCodeScanned: codes => {
      if (codes.length > 0 && codes[0].value) {
        navigation.navigate('Product Information', {barcode: codes[0].value});
      }
    },
  });

  const takeReceiptPhoto = async () => {
    if (receiptCamera.current) {
      try {
        const photo = await receiptCamera.current.takePhoto();
        navigation.navigate('Receipt Scan Result', {path: photo.path});
      } catch (e) {
        console.error(e);
      }
    }
  };

  const cameraDeviceA = useCameraDevice('back');
  const cameraDeviceB = useCameraDevice('back');

  return (
    <View style={styles.container}>
      {hasPermission ? (
        cameraDeviceA && cameraDeviceB ? (
          mode === 'Barcode' ? (
            <Camera
              key="barcode"
              onError={error => console.error(error)}
              codeScanner={codeScanner}
              device={cameraDeviceA}
              isActive={camActive}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: '100%', height: '60%'}}
            />
          ) : (
            <View style={styles.receiptContainer}>
              <Camera
                key="receipt"
                onError={error => console.error(error)}
                device={cameraDeviceB}
                isActive={camActive}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{width: '100%', height: '80%'}}
                ref={receiptCamera}
                photo
              />
              <TriggerButton onPress={takeReceiptPhoto} />
            </View>
          )
        ) : (
          <Text>No back camera available</Text>
        )
      ) : (
        <MainButton title="Allow Camera Usage" onPress={requestPermission} />
      )}
      <ModeSwitchButton
        modes={['Barcode', 'Receipt']}
        mode={mode}
        onModeChange={m => setMode(m)}
      />
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
