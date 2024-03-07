import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useGetFriendsQuery} from './api';

type User = {
  username: String;
};

type FriendProps = {
  friend: User;
};

function Friend({friend}: FriendProps) {
  return (
    <TouchableOpacity style={styles.friend}>
      <Text style={styles.friendText}>{friend.username}</Text>
    </TouchableOpacity>
  );
}

function FriendsList() {
  const {data: friends, refetch, isLoading} = useGetFriendsQuery();

  return friends && friends.length > 0 ? (
    <FlatList
      data={friends}
      style={{height: '100%', width: '100%'}}
      renderItem={({item}) => <Friend friend={item} />}
      refreshing={isLoading}
      onRefresh={refetch}
    />
  ) : (
    <Text style={styles.noFriendsText}>You don't have any friends yet</Text>
  );
}

export default function AddFriendScreen(): JSX.Element {
  return (
    <View>
      <FriendsList />
    </View>
  );
}

const styles = StyleSheet.create({
  friend: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  friendText: {
    fontSize: 20,
    color: 'gray',
  },
  noFriendsText: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
