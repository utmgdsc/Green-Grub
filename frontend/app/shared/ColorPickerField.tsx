/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TEXT_LARGE, TEXT_SMALL} from '../sizing';
import {SafeAreaView} from 'react-native-safe-area-context';
import ColorPicker, {
  HueCircular,
  Panel1,
  Preview,
} from 'reanimated-color-picker';
import ButtonGroup from './ButtonGroup';
import MainButton from './MainButton';

export default function ColorPickerField({
  color,
  setColor,
}: {
  color: string;
  setColor: (color: string) => void;
}) {
  const [localColor, setLocalColor] = React.useState(color);
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={styles.colorPickerView}>
      <Text style={styles.fieldText}>Avatar Color</Text>
      <TouchableOpacity
        style={[{backgroundColor: color}, styles.field]}
        onPress={() => setModalVisible(true)}>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}>
          <SafeAreaView style={styles.modal}>
            <Text style={styles.titleText}>Color Picker</Text>
            <ColorPicker
              onComplete={values => setLocalColor(values.rgb)}
              value={color}>
              <View style={{gap: 20}}>
                <Preview />
                <Panel1 style={{width: 200, height: 200}} />
                <HueCircular style={{width: 200, height: 200}} />
              </View>
            </ColorPicker>
            <ButtonGroup>
              <MainButton
                title="Done"
                onPress={() => {
                  setColor(localColor);
                  setModalVisible(false);
                }}
              />
            </ButtonGroup>
          </SafeAreaView>
        </Modal>
      </TouchableOpacity>
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
    width: '100%',
    paddingHorizontal: 20,
    height: TEXT_LARGE,
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
