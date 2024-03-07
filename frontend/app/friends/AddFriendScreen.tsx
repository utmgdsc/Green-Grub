import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {FriendsStackParamList} from './FriendsScreen';
import {StackScreenProps} from '@react-navigation/stack';
import TextInputField from '../shared/TextInputField';
import MainButton from '../shared/MainButton';
import {useAddFriendMutation} from './api';

type AddFriendScreenProps = StackScreenProps<
  FriendsStackParamList,
  'Add Friend'
>;

export default function AddFriendScreen({}: AddFriendScreenProps): JSX.Element {
  const [updateFriends, result] = useAddFriendMutation();
  const [username, setUsername] = useState('');
  const message = result.data?.message ?? '';

  return (
    <View style={styles.container}>
      <TextInputField
        title="Username"
        onChangeText={setUsername}
        value={username}
        isSecureText={false}
      />
      <Text style={styles.responseText}>{message}</Text>
      <MainButton
        title="Add Friend"
        onPress={async () => {
          updateFriends(username);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  responseText: {
    color: 'orange',
    fontSize: 20,
  },
});
