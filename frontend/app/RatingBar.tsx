import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export type RatingBarProps = {
  label: string;
  actual: number;
  min: number;
  max: number;
};

export default function RatingBar({label, actual, min, max}: RatingBarProps) {
  const percentage = (100 * (actual - min)) / (max - min);
  let color;

  if (percentage > 50) {
    let redChannel = Math.round(255 * ((50 - (percentage - 50)) / 50));
    color = `rgb(${redChannel}, 255, 0)`;
  } else {
    let yellowChannel = Math.round(255 * (percentage / 50));
    color = `rgb(255, ${yellowChannel}, 0)`;
  }

  return (
    <View>
      <Text>
        {label} - {actual}/{max}
      </Text>
      <View style={styles.ratingBar}>
        <View
          style={[styles.ratingBar, {backgroundColor: color, flex: percentage}]}
        />
        <View
          style={[
            styles.ratingBar,
            {backgroundColor: 'lightgray'},
            {flex: 100 - percentage},
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ratingBar: {
    elevation: 5,
    height: 20,
    flexDirection: 'row',
  },
});
