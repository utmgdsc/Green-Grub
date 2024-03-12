import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Friend} from './api';
import {TEXT_LARGE} from '../sizing';
import Card from '../Card';
import MainButton from '../shared/MainButton';

type FriendInformationProps = {
  friend: Friend;
  onUnfriend?: () => void;
};

export function FriendInformation({
  friend,
  onUnfriend,
}: FriendInformationProps) {
  return (
    <Card>
      <Text style={styles.friendInformationText}>{friend.username}</Text>
      {onUnfriend && <MainButton title="Unfriend" onPress={onUnfriend} />}
    </Card>
  );
}

const styles = StyleSheet.create({
  friendInformationText: {
    fontSize: TEXT_LARGE,
    textAlign: 'center',
    color: 'black',
  },
});
