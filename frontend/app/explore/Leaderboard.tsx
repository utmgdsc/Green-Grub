import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {LeaderboardEntry, useGetLeaderboardQuery} from './api';
import LinearGradient from 'react-native-linear-gradient';
import {TEXT_MEDIUM} from '../sizing';

function colorForPlace(place: number) {
  if (place === 1) {
    return '#FFD700';
  }
  if (place === 2) {
    return '#C0C0C0';
  }
  if (place === 3) {
    return '#CD7F32';
  }
  return '#3AC765';
}

function LeaderboardPlace({place}: {place: number}) {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
      }}>
      {/* eslint-disable-next-line react-native/no-inline-styles*/}
      <Text style={{color: 'white', fontSize: TEXT_MEDIUM}}>{place}</Text>
    </View>
  );
}

function LeaderboardItem({
  username,
  score,
  place,
}: LeaderboardEntry & {place: number}) {
  return (
    <LinearGradient
      colors={[colorForPlace(place), 'white']}
      start={{x: 0.3, y: 0}}
      end={{x: 0.7, y: 1}}
      style={styles.leaderboardItem}>
      <View style={styles.leaderBoardItemFront}>
        <LeaderboardPlace place={place} />
        <Text style={styles.leaderboardItemText}>{username}</Text>
      </View>
      <Text>{score}</Text>
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
        renderItem={({item, index}) => (
          <LeaderboardItem {...item} place={index + 1} />
        )}
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
    gap: 20,
  },
  leaderboardItem: {
    elevation: 10,
    borderRadius: 20,
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leaderBoardItemFront: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  leaderboardItemText: {
    color: 'black',
    fontSize: TEXT_MEDIUM,
  },
});
