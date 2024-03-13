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
  success_url: string;
  navigation: QuizListScreenNavigationProp;
};

const QuizItem = ({
  id,
  topic_title,
  order,
  success_url,
  navigation,
}: QuizProps) => {
  const handlePress = () => {
    navigation.navigate('QuizDetails', {quizId: id, questionNumber: 1});
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{topic_title}</Text>
      <Text style={styles.subText}>Order: {order}</Text>
    </TouchableOpacity>
  );
};

const QuizListScreen = ({route, navigation}: QuizListScreenProps) => {
  const {topicId} = route.params;
  const {data, isLoading} = useGetQuizzesQuery(topicId);
  const unAttemptedQuizzes = data.unattempted_or_not_passed_quizzes;
  const passedQuizzes = data.passed_quizzes;

  console.log(data);
  console.log(unAttemptedQuizzes);
  return (
    <ScrollView style={styles.container}>
      {isLoading && <Text>Loading...</Text>}
      {unAttemptedQuizzes && unAttemptedQuizzes.length > 0 ? (
        unAttemptedQuizzes.map(quiz => (
          <QuizItem key={quiz.id} quizId={quiz.id} {...quiz} navigation={navigation} />
        ))
      ) : (
        <Text>No quizzes to complete available for this topic.</Text>
      )}

      if (unAttemptedQuizzes && unAttemptedQuizzes.length > 0)  { (
        passedQuizzes.map(quiz => (
          <QuizItem key={quiz.id} quizId={quiz.id} {...quiz} navigation={navigation} />
        ))
      ) }
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
  progressBar: {
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 10,
  },
});

export default QuizListScreen;
