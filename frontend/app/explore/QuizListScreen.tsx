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
    // Assuming the ID is the quiz ID and the first question is always question number 1
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
  // Extract the topicId parameter from the route
  const {topicId} = route.params;
  // Fetch the quizzes for the given topicId
  const {data, isLoading} = useGetQuizzesQuery(topicId); // Adjust your API hook accordingly

  return (
    <ScrollView style={styles.container}>
      {isLoading && <Text>Loading...</Text>}
      {data && data.length > 0 ? (
        data.map(quiz => (
          <QuizItem key={quiz.id} {...quiz} navigation={navigation} />
        ))
      ) : (
        <Text>No quizzes available for this topic.</Text>
      )}
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
