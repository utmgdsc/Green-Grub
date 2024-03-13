import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ExploreTab, {QuizzesStackParamList} from './ExploreTab';
import {useGetTopicsQuery} from './api';
import {StackScreenProps} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type ExploreScreenProps = StackScreenProps<QuizzesStackParamList, 'Explore'>;

type TopicProps = {
  topic_id: number;
  passed_quizzes: number;
  total_quizzes: number;
  navigation: ExploreScreenProps['navigation'];
};

function Topic({topic_id, passed_quizzes, total_quizzes}: TopicProps) {
  const navigation = useNavigation();

  const progressWidth =
    total_quizzes > 0 ? `${(passed_quizzes / total_quizzes) * 100}%` : '0%';

  const handlePress = () => {
    console.log('topic id', topic_id);
    console.log(navigation);
    navigation.navigate('QuizListScreen', {topicId: topic_id});
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, {width: progressWidth}]} />
      </View>
      <Text style={styles.buttonText}>Topic ID: {topic_id}</Text>
      <Text style={styles.subText}>
        Passed: {passed_quizzes}/{total_quizzes}
      </Text>
    </TouchableOpacity>
  );
}

function ExploreScreen({}) {
  const {data, isLoading} = useGetTopicsQuery();
  return (
    <ScrollView style={styles.container}>
      {isLoading && <Text>Loading...</Text>}
      {data?.map((topic: TopicProps) => (
        <Topic
          key={topic.topic_id}
          topic_id={topic.topic_id}
          passed_quizzes={topic.passed_quizzes}
          total_quizzes={topic.total_quizzes}
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

export default ExploreScreen;
