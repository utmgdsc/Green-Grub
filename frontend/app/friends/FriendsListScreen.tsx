import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type User = {
  username: String;
};

type FriendsListProps = {
  friends: User[];
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

function FriendsList({friends}: FriendsListProps) {
  return (
    <FlatList
      data={friends}
      renderItem={({item}) => <Friend friend={item} />}
    />
  );
}

export default function AddFriendScreen(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const {date: friends} = {date: SAMPLE_FRIENDS};

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FriendsList friends={friends} />
      )}
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
