import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ExploreScreen from './ExploreScreen';
import QuizListScreen from './QuizListScreen';
import QuizDetailsScreen from './QuizDetailsScreen';

export type QuizzesStackParamList = {
  TopicsList: undefined;
  QuizListScreen: {topicId: number};
  QuizDetails: {quizId: number; questionNumber: number};
};

const QuizzesStackNavigator = createStackNavigator<QuizzesStackParamList>();

const ExploreTab = () => {
  return (
    <QuizzesStackNavigator.Navigator initialRouteName="TopicsList">
      <QuizzesStackNavigator.Screen
        name="TopicsList"
        component={ExploreScreen}
        options={{title: 'Explore Topics'}}
      />
      <QuizzesStackNavigator.Screen
        name="QuizListScreen"
        component={QuizListScreen}
      />
      <QuizzesStackNavigator.Screen
        name="QuizDetails"
        component={QuizDetailsScreen}
      />
    </QuizzesStackNavigator.Navigator>
  );
};

export default ExploreTab;
