import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {LeaderboardEntry, useGetLeaderboardQuery} from './api';

function LeaderboardItem({username}: LeaderboardEntry) {
  return (
    <View style={styles.leaderboardItem}>
      <Text style={styles.leaderboardItemText}>{username}</Text>
    </View>
  );
}

export default function Leaderboard({}) {
  const {data: leaderboard} = useGetLeaderboardQuery();

  return (
    <View style={styles.container}>
      <FlatList
        data={leaderboard}
        renderItem={({item}) => <LeaderboardItem {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderboardItem: {
    borderBottomColor: 'gray',
  },
  leaderboardItemText: {
    color: 'gray',
  },
});
