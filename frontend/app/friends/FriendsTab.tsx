import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import AddFriendScreen from './AddFriendScreen';
import FriendsListScreen from './FriendsListScreen';
import {View} from 'react-native';
import SecondaryButton from '../shared/SecondaryButton';
import FriendInvitationScreen from './FriendInvitationsScreen';

type FriendScreenProps = BottomTabScreenProps<MainTabsParamList, 'Friends'>;

export type FriendsStackParamList = {
  'Your Friends': undefined;
  'Add Friend': undefined;
  Invitations: undefined;
};

const Stack = createStackNavigator<FriendsStackParamList>();

export default function FriendsScreen({navigation}: FriendScreenProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: '#fdfdfd'},
      }}>
      <Stack.Screen
        name="Your Friends"
        component={FriendsListScreen}
        options={{
          headerLeft: () => null,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{paddingHorizontal: 10}}>
              <SecondaryButton
                title="Add Friend"
                onPress={() => {
                  (
                    navigation as unknown as StackNavigationProp<
                      FriendsStackParamList,
                      'Your Friends',
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
      <Stack.Screen name="Invitations" component={FriendInvitationScreen} />
    </Stack.Navigator>
  );
}
