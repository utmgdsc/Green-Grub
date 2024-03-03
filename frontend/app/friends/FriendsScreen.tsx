import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';
import {createStackNavigator} from '@react-navigation/stack';
import AddFriendScreen from './AddFriendScreen';

type FriendScreenProps = BottomTabScreenProps<MainTabsParamList, 'Friends'>;

export type FriendsStackParamList = {
  'Add Friend': undefined;
};

const Stack = createStackNavigator<FriendsStackParamList>();

export default function FriendsScreen({}: FriendScreenProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Add Friend"
        component={AddFriendScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
