/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TEXT_LARGE, TEXT_SMALL} from '../sizing';
import MainButton from './MainButton';
import {launchImageLibrary} from 'react-native-image-picker';

export default function ImagePickerField({
  imageUri,
  setImageUri,
}: {
  imageUri: string;
  setImageUri: (image: string) => void;
}) {
  async function chooseImage() {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (!result.didCancel && result.assets) {
      setImageUri(result.assets[0].uri ?? '');
    }
  }

  return (
    <View style={styles.colorPickerView}>
      <Text style={styles.fieldText}>Profile Picture</Text>
      {imageUri ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            gap: 10,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Image source={{uri: imageUri}} style={styles.field} />
          <MainButton title="Replace Image" onPress={chooseImage} />
        </View>
      ) : (
        <MainButton title="Choose Image" onPress={chooseImage} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  colorPickerView: {
    width: '80%',
    justifyContent: 'center',
  },
  fieldText: {
    fontSize: TEXT_SMALL,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  field: {
    width: 60,
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  titleText: {
    color: 'black',
    fontSize: TEXT_LARGE,
  },
  modal: {
    padding: 20,
    height: '100%',
    alignItems: 'center',
  },
});
