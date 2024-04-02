import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import SavedItemsScreen from '../savedItems/SavedItemsScreen';

type HomeScreenProps = BottomTabScreenProps<MainTabsParamList, 'Home Tab'>;

export type HomeStackParamList = {
  Home: undefined;
  'Saved Items': undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

export default function FriendsScreen({}: HomeScreenProps) {
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
      <Stack.Screen
        name="Saved Items"
        component={SavedItemsScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{headerTitle: ''}}
      />
    </Stack.Navigator>
  );
}
