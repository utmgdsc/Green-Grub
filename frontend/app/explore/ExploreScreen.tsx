import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';

type StartScreenProps = BottomTabScreenProps<MainTabsParamList, 'Explore'>;

export default function ExploreScreen({}: StartScreenProps) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Explore Quizzes</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Introduction</Text>
        <Text style={styles.subText}>Start from here</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, {width: '55%'}]} />
        </View>
        <Text style={styles.buttonText}>Food Waste</Text>
        <Text style={styles.subText}>
          Impact of food waste and steps to address it
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, {width: '16%'}]} />
        </View>
        <Text style={styles.buttonText}>Transportation</Text>
        <Text style={styles.subText}>
          Impact of food waste and steps to address it
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Water</Text>
        <Text style={styles.subText}>
          Impact of food waste and steps to address it
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 24,
  },
  button: {
    backgroundColor: '#F0F0F0',
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subText: {
    fontSize: 16,
  },
  progressContainer: {
    height: 20,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 10,
  },
});
