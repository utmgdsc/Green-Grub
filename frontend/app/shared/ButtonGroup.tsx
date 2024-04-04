import React, {PropsWithChildren} from 'react';

import {View, StyleSheet, ViewStyle} from 'react-native';

export default function ButtonGroup({
  children,
  style,
}: PropsWithChildren<{style?: ViewStyle}>) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    gap: 10,
    justifyContent: 'center',
    margin: 10,
  },
});
