import React from 'react';
import {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

export default function Card({children}: PropsWithChildren): JSX.Element {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'column',
    gap: 20,
    padding: 20,
    margin: 20,
    width: '100%',
  },
});
