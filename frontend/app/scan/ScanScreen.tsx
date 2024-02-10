import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import MainButton from '../shared/MainButton';
import {useIsFocused} from '@react-navigation/native';
import ModeSwitchButton from '../shared/ModeSwitchButton';

type StartScreenProps = BottomTabScreenProps<MainTabsParamList, 'Scan'>;

export default function ScanScreen({navigation}: StartScreenProps) {
  const {hasPermission, requestPermission} = useCameraPermission();
  const camActive = useIsFocused();
  const [mode, setMode] = useState('Barcode');

  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13'],
    onCodeScanned: codes => {
      if (codes.length > 0) {
        navigation.navigate('Scan Result', {barcode: codes[0].value});
      }
    },
  });

  const cameraDevice = useCameraDevice('back');

  return (
    <View style={styles.container}>
      {hasPermission ? (
        cameraDevice ? (
          <Camera
            codeScanner={codeScanner}
            device={cameraDevice}
            isActive={camActive}
            style={{width: '100%', height: '100%'}}
          />
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
    marginVertical: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
