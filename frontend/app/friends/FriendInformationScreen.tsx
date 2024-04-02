import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Friend} from './api';
import {TEXT_LARGE} from '../sizing';
import {DARK_GRAY} from '../colors';
import Card from '../Card';

type FriendInformationProps = PropsWithChildren<{
  friend: Friend;
  onClose: () => void;
}>;

export function FriendInformation({
  friend,
  children,
  onClose,
}: FriendInformationProps) {
  return (
    <Card>
      <View style={styles.friendInfo}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={20} color={DARK_GRAY} />
          </TouchableOpacity>
        </View>
        <Text style={styles.friendInformationText}>{friend.username}</Text>
        {children}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  friendInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  friendInformationText: {
    fontSize: TEXT_LARGE,
    textAlign: 'center',
    color: 'black',
  },
  closeButtonContainer: {
    width: '100%',
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
