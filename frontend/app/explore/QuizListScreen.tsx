import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainTabsParamList} from '../MainTabs';
import {useGetQuizzesQuery} from './api';
import {PRIMARY_BLUE} from '../colors';
type QuizListScreenNavigationProp = StackNavigationProp<
  MainTabsParamList,
  'QuizList'
>;

type QuizListScreenRouteProp = RouteProp<MainTabsParamList, 'QuizList'>;

type QuizListScreenProps = {
  navigation: QuizListScreenNavigationProp;
  route: QuizListScreenRouteProp;
};

type QuizProps = {
  id: number;
  topic_title: string;
  order: number;
  completed: boolean;
  success_url: string;
  navigation: QuizListScreenNavigationProp;
};

const QuizItem = ({
  id,
  topic_title,
  completed,
  order,
  success_url,
  navigation,
}: QuizProps) => {
  const handlePress = () => {
    if (completed == false) {
      navigation.navigate('QuizDetailsScreen', {
        quizId: id,
        quizTopic: topic_title,
        questionNumber: 1,
      });
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{topic_title} </Text>
      <Text style={{color: 'white', marginBottom: 10, marginTop: 15}}>
        {completed ? 'Completed' : ''}
      </Text>
    </TouchableOpacity>
  );
};

const QuizListScreen = ({route, navigation}: QuizListScreenProps) => {
  const {topicId} = route.params;
  const {data, isLoading} = useGetQuizzesQuery(topicId);

  if (isLoading) {
    return (
      <ScrollView style={styles.container}>
        <Text>Loading...</Text>
      </ScrollView>
    );
  }

  if (!data)
    return (
      <ScrollView style={styles.container}>
        <Text>No topics found</Text>
      </ScrollView>
    );

  const unAttemptedQuizzes = data.unattempted_or_not_passed_quizzes;
  const passedQuizzes = data.passed_quizzes;

  return (
    <ScrollView style={styles.container}>
      {unAttemptedQuizzes && unAttemptedQuizzes.length > 0 ? (
        unAttemptedQuizzes.map(quiz => (
          <QuizItem
            key={quiz.id}
            id={quiz.id}
            completed={false}
            {...quiz}
            navigation={navigation}
          />
        ))
      ) : (
        <Text
          style={{
            marginBottom: 20,
            marginLeft: 10,
            fontSize: 16,
            textAlign: 'center',
          }}>
          No quizzes to complete available for this topic.
        </Text>
      )}
      {passedQuizzes &&
        passedQuizzes.length > 0 &&
        passedQuizzes.map(quiz => (
          <QuizItem
            key={quiz.id}
            id={quiz.id}
            completed={true}
            {...quiz}
            navigation={navigation}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  button: {
    backgroundColor: PRIMARY_BLUE,
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'white',
  },
  subText: {
    fontSize: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 10,
  },
});

export default QuizListScreen;
