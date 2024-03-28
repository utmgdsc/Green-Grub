import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import SavedItemsScreen from '../savedItems/SavedItemsScreen';
import LeaderboardScreen from '../leaderboard/LeaderBoardScreen';

type HomeScreenProps = BottomTabScreenProps<MainTabsParamList, 'Home Tab'>;

export type HomeStackParamList = {
  Home: undefined;
  'Saved Items': undefined;
  Leaderboard: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeTab({}: HomeScreenProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#fdfdfd'},
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Saved Items" component={SavedItemsScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
    </Stack.Navigator>
  );
}
