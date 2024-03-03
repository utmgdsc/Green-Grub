import React from 'react';
import {Text, View} from 'react-native';
import {FriendsStackParamList} from './FriendsScreen';
import {StackScreenProps} from '@react-navigation/stack';

type AddFriendScreenProps = StackScreenProps<
  FriendsStackParamList,
  'Add Friend'
>;

export default function AddFriendScreen({}: AddFriendScreenProps): JSX.Element {
  return (
    <View>
      <Text>Friends</Text>
    </View>
  );
}
