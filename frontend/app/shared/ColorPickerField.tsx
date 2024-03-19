import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TEXT_LARGE, TEXT_SMALL} from '../sizing';
import {SafeAreaView} from 'react-native-safe-area-context';
import ColorPicker from 'react-native-wheel-color-picker';
import ButtonGroup from './ButtonGroup';
import MainButton from './MainButton';

export default function ColorPickerField({
  color,
  setColor,
}: {
  color: string;
  setColor: (color: string) => void;
}) {
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
            <ColorPicker color={color} onColorChangeComplete={setColor} />
            <ButtonGroup>
              <MainButton title="Done" onPress={() => setModalVisible(false)} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
