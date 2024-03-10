import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';

export type ModeSwitchButtonProps = {
  mode?: string;
  modes: string[];
  onModeChange: (mode: string) => void;
};

function Mode({
  name,
  active,
  onSelect,
}: {
  name: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        styles.modeContainer,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: active ? 'gray' : 'white',
        },
      ]}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{color: active ? 'white' : 'gray'}}>{name}</Text>
    </TouchableOpacity>
  );
}

export default function ModeSwitchButton({
  modes,
  mode,
  onModeChange,
}: ModeSwitchButtonProps) {
  const [activeMode, setActiveMode] = useState(modes[0]);

  return (
    <View style={styles.modeSwitchContainer}>
      {modes.map(m => (
        <Mode
          key={m}
          name={m}
          active={mode ? mode === m : activeMode === m}
          onSelect={() => {
            setActiveMode(m);
            onModeChange(m);
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  modeContainer: {
    padding: 8,
    borderRadius: 20,
  },
  modeSwitchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
