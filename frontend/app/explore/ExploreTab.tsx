import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ExploreScreen from './ExploreScreen';
import QuizListScreen from './QuizListScreen';
import QuizDetailsScreen from './QuizDetailsScreen';
import ResultsScreen from './ResultsScreen';

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
        name="ExploreScreen"
        component={ExploreScreen}
        options={{title: 'Explore Topics'}}
      />
      <QuizzesStackNavigator.Screen
        name="QuizListScreen"
        component={QuizListScreen}
        options={{title: 'Quizzes'}}
      />
      <QuizzesStackNavigator.Screen
        name="QuizDetailsScreen"
        component={QuizDetailsScreen}
        options={{title: 'Question'}}
      />
      <QuizzesStackNavigator.Screen
        name="ResultsScreen"
        component={ResultsScreen}
        options={{title: 'Results'}}
      />
    </QuizzesStackNavigator.Navigator>
  );
};

export default ExploreTab;
