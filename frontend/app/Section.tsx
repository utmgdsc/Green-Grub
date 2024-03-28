import React from 'react';
import {Text, TextStyle, View, ViewStyle} from 'react-native';
import {TEXT_LARGE} from './sizing';

export default function Section({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View style={styles.sectionWrapper}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.section}>{children}</View>
    </View>
  );
}

const styles = {
  sectionWrapper: {
    backgroundColor: 'white',
    width: '100%' as ViewStyle['width'],
    marginVertical: 20,
  },
  section: {
    backgroundColor: 'white',
    width: '100%' as ViewStyle['width'],
  },
  sectionTitle: {
    fontSize: TEXT_LARGE,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    color: 'black',
    marginBottom: 10,
  },
};
