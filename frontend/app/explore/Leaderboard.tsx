import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {LeaderboardEntry, useGetLeaderboardQuery} from './api';
import LinearGradient from 'react-native-linear-gradient';

function LeaderboardItem({username}: LeaderboardEntry) {
  return (
    <LinearGradient
      colors={['#3AC765', '#E9F8EE']}
      start={{x: 0.3, y: 0}}
      end={{x: 0.7, y: 1}}
      style={styles.leaderboardItem}>
      <Text style={styles.leaderboardItemText}>{username}</Text>
    </LinearGradient>
  );
}

export default function Leaderboard({}) {
  const {data: leaderboard} = useGetLeaderboardQuery();

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
        data={leaderboard}
        renderItem={({item}) => <LeaderboardItem {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
    height: '100%',
  },
  listContentContainer: {
    width: '100%',
    padding: 20,
  },
  leaderboardItem: {
    elevation: 10,
    borderRadius: 20,
    width: '100%',
    padding: 20,
  },
  leaderboardItemText: {
    color: 'black',
  },
});
