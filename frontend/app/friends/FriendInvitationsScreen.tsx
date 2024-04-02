/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Friend,
  useAcceptFriendMutation,
  useDeclineFriendMutation,
  useGetFriendsRequestsReceivedQuery,
} from './api';
import Icon from 'react-native-vector-icons/AntDesign';
import ProfileSummary from '../profile/ProfileSummary';
import {SecondaryButtonDynamic} from '../shared/SecondaryButton';

type FriendProps = {
  friend: Friend;
  onSelected?: () => void;
};

function ShortPendingFriendInfo({friend, onSelected}: FriendProps) {
  const [acceptFriend] = useAcceptFriendMutation();
  const [declineFriend] = useDeclineFriendMutation();

  return (
    <TouchableOpacity style={styles.friend} onPress={onSelected}>
      <Text style={styles.friendText}>{friend.username}</Text>
      <View style={styles.friendInfoDirectAction}>
        <TouchableOpacity onPress={() => acceptFriend(friend.username)}>
          <Icon name="checkcircle" size={40} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => declineFriend(friend.username)}>
          <Icon name="closecircle" size={40} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function FriendsList() {
  const [viewFriend, setViewFriend] = React.useState<Friend | null>(null);
  const {
    data: friends,
    refetch,
    isLoading,
  } = useGetFriendsRequestsReceivedQuery();
  const [acceptFriend] = useAcceptFriendMutation();
  const [declineFriend] = useDeclineFriendMutation();

  return friends && friends.length > 0 ? (
    <View>
      <Modal
        animationType="slide"
        visible={!!viewFriend}
        onRequestClose={() => setViewFriend(null)}>
        <View style={styles.friendInfoModal}>
          {viewFriend !== null ? (
            <ProfileSummary username={viewFriend.username}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  gap: 20,
                }}>
                <SecondaryButtonDynamic
                  style={{flexGrow: 1}}
                  title="Decline"
                  onPress={() => declineFriend(viewFriend.username)}
                />
                <SecondaryButtonDynamic
                  style={{flexGrow: 1}}
                  title="Accept"
                  onPress={() => acceptFriend(viewFriend.username)}
                />
              </View>
            </ProfileSummary>
          ) : (
            ''
          )}
        </View>
      </Modal>
      <FlatList
        data={friends}
        style={{height: '100%', width: '100%'}}
        renderItem={({item}) => (
          <ShortPendingFriendInfo
            friend={item}
            onSelected={() => setViewFriend(item)}
          />
        )}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </View>
  ) : (
    <Text style={styles.noFriendsText}>
      You don't have any friend invitations
    </Text>
  );
}

export default function FriendInvitationScreen(): JSX.Element {
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
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  friendText: {
    fontSize: 20,
    color: 'gray',
  },
  friendInfoDirectAction: {
    flexDirection: 'row',
    gap: 15,
  },
  noFriendsText: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  friendInfoModal: {
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
