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
import {useGetTopicsQuery} from './api';

type StartScreenProps = BottomTabScreenProps<MainTabsParamList, 'Explore'>;

type TopicProps = {
  id: number;
  passed: number;
  total: number;
};

function Topic({id, passed, total}: TopicProps) {
  const progressWidth = total > 0 ? `${(passed / total) * 100}%` : '0%';

  return (
    <TouchableOpacity style={styles.button}>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, {width: progressWidth}]} />
      </View>
      <Text style={styles.buttonText}>Topic ID: {id}</Text>
      <Text style={styles.subText}>
        Passed: {passed}/{total}
      </Text>
    </TouchableOpacity>
  );
}

function TopicsList() {
  const {data, isLoading} = useGetTopicsQuery();
  console.log(data);
  return (
    <ScrollView style={styles.container}>
      {isLoading && <Text>Loading...</Text>}
      {data?.map(topic => (
        <Topic
          key={topic.topic_id}
          id={topic.topic_id}
          passed={topic.passed_quizzes}
          total={topic.total_quizzes}
        />
      ))}
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

export default TopicsList;
