import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {FriendsStackParamList} from './FriendsTab';
import {StackScreenProps} from '@react-navigation/stack';
import TextInputField from '../shared/TextInputField';
import SecondaryButton from '../shared/SecondaryButton';
import {useAddFriendMutation, useGetFriendsQuery} from './api';
import {ReducedProfileSummary} from '../profile/ProfileSummary';

type AddFriendScreenProps = StackScreenProps<
  FriendsStackParamList,
  'Add Friend'
>;

export default function AddFriendScreen({}: AddFriendScreenProps): JSX.Element {
  const [updateFriends, result] = useAddFriendMutation();
  const {data: friends} = useGetFriendsQuery();
  const [username, setUsername] = useState('');
  const [displayUsername, setDisplayUsername] = useState('');
  let message =
    result.data?.message ?? (result.error as {message?: string})?.message ?? '';
  let alreadyFriends = false;
  if (friends && friends.some(friend => friend.username === displayUsername)) {
    alreadyFriends = true;
  }

  return (
    <View style={styles.container}>
      {displayUsername && (
        <ReducedProfileSummary username={displayUsername}>
          {!alreadyFriends ? (
            <SecondaryButton
              title="Add Friend"
              onPress={async () => {
                await updateFriends(displayUsername);
              }}
            />
          ) : (
            <Text style={styles.responseText}>Already friends!</Text>
          )}
        </ReducedProfileSummary>
      )}
      <Text style={styles.responseText}>{message}</Text>
      <TextInputField
        title="Username"
        onChangeText={setUsername}
        value={username}
        isSecureText={false}
      />
      <SecondaryButton
        title="Search"
        onPress={() => {
          setDisplayUsername(username);
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
    padding: 20,
  },
  responseText: {
    color: 'orange',
    fontSize: 20,
  },
});
