/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ActivityIndicator,
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
import {ProfileImage, ReducedProfileSummary} from '../profile/ProfileSummary';
import {SecondaryButtonDynamic} from '../shared/SecondaryButton';
import {TEXT_SMALL} from '../sizing';
import {useGetReducedUserQuery} from '../login/api';

type FriendProps = {
  friend: Friend;
  onSelected?: () => void;
};

function ShortPendingFriendInfo({friend, onSelected}: FriendProps) {
  const [acceptFriend] = useAcceptFriendMutation();
  const [declineFriend] = useDeclineFriendMutation();
  const {data: friendUser} = useGetReducedUserQuery(friend.username);

  return (
    <TouchableOpacity style={styles.friend} onPress={onSelected}>
      <View style={{flexDirection: 'row', gap: 15, alignItems: 'center'}}>
        <ProfileImage uri={friendUser?.avatar_url} size={50} />
        <Text style={styles.friendText}>{friend.username}</Text>
      </View>
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

export default function FriendsList() {
  const [viewFriend, setViewFriend] = React.useState<Friend | null>(null);
  const {
    data: friends,
    refetch,
    isFetching,
  } = useGetFriendsRequestsReceivedQuery();
  const [acceptFriend] = useAcceptFriendMutation();
  const [declineFriend] = useDeclineFriendMutation();

  if (isFetching) {
    return <ActivityIndicator size="large" color="gray" />;
  }

  return (
    <>
      {friends && friends.length > 0 ? (
        <View>
          <Modal
            animationType="slide"
            visible={!!viewFriend}
            onRequestClose={() => setViewFriend(null)}>
            <View style={styles.friendInfoModal}>
              {viewFriend !== null ? (
                <ReducedProfileSummary username={viewFriend.username}>
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
                      onPress={() => {
                        declineFriend(viewFriend.username);
                        setViewFriend(null);
                      }}
                    />
                    <SecondaryButtonDynamic
                      style={{flexGrow: 1}}
                      title="Accept"
                      onPress={() => {
                        acceptFriend(viewFriend.username);
                        setViewFriend(null);
                      }}
                    />
                  </View>
                </ReducedProfileSummary>
              ) : null}
            </View>
          </Modal>
          {friends.map(item => (
            <ShortPendingFriendInfo
              friend={item}
              onSelected={() => setViewFriend(item)}
            />
          ))}
        </View>
      ) : (
        <Text style={styles.noFriendsText}>
          You don't have any friend invitations
        </Text>
      )}
      <TouchableOpacity onPress={refetch}>
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  friend: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
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
  refreshText: {
    fontSize: TEXT_SMALL,
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});
