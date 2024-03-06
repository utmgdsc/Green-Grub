import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type User = {
  username: String;
};

type FriendProps = {
  friend: User;
};

const SAMPLE_FRIENDS: User[] = [
  {username: 'John'},
  {username: 'Jane'},
  {username: 'Jack'},
  {username: 'Jill'},
];

function Friend({friend}: FriendProps) {
  return (
    <TouchableOpacity style={styles.friend}>
      <Text style={styles.friendText}>{friend.username}</Text>
    </TouchableOpacity>
  );
}

function FriendsList() {
  const [isLoading, setIsLoading] = useState(true);
  const {date: friends} = {date: SAMPLE_FRIENDS};

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <FlatList
      data={friends}
      renderItem={({item}) => <Friend friend={item} />}
      refreshing={isLoading}
      onRefresh={() => {
        setTimeout(() => setIsLoading(false), 500);
        setIsLoading(true);
      }}
    />
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
});
