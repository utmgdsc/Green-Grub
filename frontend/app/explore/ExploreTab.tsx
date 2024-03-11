import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TopicsList from './ExploreScreen';
import QuizListScreen from './QuizListScreen';
import QuizDetailsScreen from './QuizDetailsScreen';

export type QuizzesStackParamList = {
  TopicsList: undefined;
  QuizList: {topicId: number};
  QuizDetails: {quizId: number; questionNumber: number};
};

const QuizzesStackNavigator = createStackNavigator<QuizzesStackParamList>();

const ExploreScreen = () => {
  return (
    <QuizzesStackNavigator.Navigator initialRouteName="TopicsList">
      <QuizzesStackNavigator.Screen
        name="TopicsList"
        component={TopicsList}
        options={{title: 'Explore Topics'}}
      />
      <QuizzesStackNavigator.Screen
        name="QuizList"
        component={QuizListScreen}
      />
      <QuizzesStackNavigator.Screen
        name="QuizDetails"
        component={QuizDetailsScreen}
      />
    </QuizzesStackNavigator.Navigator>
  );
};

export default ExploreScreen;
