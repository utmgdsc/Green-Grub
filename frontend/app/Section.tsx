/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {TEXT_LARGE} from './sizing';
import Icon from 'react-native-vector-icons/Entypo';

function EditableTitle({
  title,
  editable,
  onConfirm,
}: {
  title: string;
  editable: boolean;
  onConfirm?: (newTitle: string) => void;
}) {
  const ref = useRef<TextInput>(null);
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(title);

  useEffect(() => {
    if (editing) {
      ref.current?.focus();
    }
  }, [editing]);

  return (
    <TouchableOpacity
      style={styles.editableTitle}
      onPress={() => setEditing(true)}>
      {editing ? (
        <TextInput
          value={value}
          style={[
            styles.sectionTitle,
            {borderColor: 'orange', borderWidth: 2, padding: 0},
          ]}
          onChangeText={setValue}
          onBlur={() => {
            setEditing(false);
            onConfirm?.(value);
          }}
          ref={ref}
        />
      ) : (
        <>
          <Text style={styles.sectionTitle}>{title}</Text>
          {editable ? <Icon name="edit" size={25} color="black" /> : null}
        </>
      )}
    </TouchableOpacity>
  );
}

export default function Section({
  children,
  title,
  editable,
  onConfirm,
}: {
  children: React.ReactNode;
  title: string;
  editable?: boolean;
  onConfirm?: (newTitle: string) => void;
}) {
  const usedEditable = editable ?? false;

  return (
    <View style={styles.sectionWrapper}>
      <EditableTitle
        title={title}
        editable={usedEditable}
        onConfirm={onConfirm}
      />
      <View style={styles.section}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  editableTitle: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'baseline',
  },
  sectionWrapper: {
    backgroundColor: 'white',
    width: '100%',
    marginVertical: 20,
  },
  section: {
    backgroundColor: 'white',
    width: '100%',
  },
  sectionTitle: {
    fontSize: TEXT_LARGE,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 20,
    marginBottom: 10,
  },
});
