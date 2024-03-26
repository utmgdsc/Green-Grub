import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {LeaderboardEntry, useGetLeaderboardQuery} from './api';
import LinearGradient from 'react-native-linear-gradient';
import {TEXT_LARGE, TEXT_MEDIUM, TEXT_XLARGE} from '../sizing';

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
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          color: 'white',
          fontSize: TEXT_MEDIUM,
          fontFamily: 'Peralta-Regular',
        }}>
        {place}
      </Text>
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
      <Text style={styles.leaderboardScore}>{score}</Text>
    </LinearGradient>
  );
}

export default function Leaderboard({}) {
  const {data: leaderboard, isFetching, refetch} = useGetLeaderboardQuery();

  return (
    <View style={styles.container}>
      <Text style={styles.leaderboardText}>Leaderboard</Text>
      <FlatList
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
        data={leaderboard}
        renderItem={({item, index}) => (
          <LeaderboardItem {...item} place={index + 1} />
        )}
        refreshing={isFetching}
        onRefresh={refetch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  leaderboardText: {
    fontFamily: 'Pacifico-Regular',
    color: 'black',
    fontSize: TEXT_XLARGE,
  },
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
    alignItems: 'center',
  },
  leaderBoardItemFront: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  leaderboardItemText: {
    color: 'black',
    fontSize: TEXT_MEDIUM,
    fontFamily: 'Peralta-Regular',
  },
  leaderboardScore: {
    color: 'black',
    fontSize: TEXT_LARGE,
    fontFamily: 'Peralta-Regular',
  },
});
