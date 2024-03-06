import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import AddFriendScreen from './AddFriendScreen';
import FriendsListScreen from './FriendsListScreen';
import {Button, View} from 'react-native';

type FriendScreenProps = BottomTabScreenProps<MainTabsParamList, 'Friends'>;

export type FriendsStackParamList = {
  'Friends List': undefined;
  'Add Friend': undefined;
};

const Stack = createStackNavigator<FriendsStackParamList>();

export default function FriendsScreen({navigation}: FriendScreenProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Friends List"
        component={FriendsListScreen}
        options={{
          headerLeft: () => null,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{paddingHorizontal: 10}}>
              <Button
                title="Add Friend"
                onPress={() => {
                  (
                    navigation as unknown as StackNavigationProp<
                      FriendsStackParamList,
                      'Friends List',
                      undefined
                    >
                  ).navigate('Add Friend');
                }}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen name="Add Friend" component={AddFriendScreen} />
    </Stack.Navigator>
  );
}
