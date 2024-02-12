import React, {PropsWithChildren} from 'react';

import {View, StyleSheet} from 'react-native';

export default function ButtonGroup({children}: PropsWithChildren) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '80%',
    gap: 10,
    justifyContent: 'center',
    margin: 10,
  },
});
