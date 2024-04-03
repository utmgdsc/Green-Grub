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
  useGetFriendsQuery,
  Friend,
  useRemoveFriendMutation,
  useGetFriendsRequestsReceivedQuery,
} from './api';
import SecondaryButton from '../shared/SecondaryButton';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {FriendsStackParamList} from './FriendsTab';
import ProfileSummary from '../profile/ProfileSummary';
import Section from '../Section';
import FriendsInvitationList from './FriendsInvitationList';

type FriendsListScreenProps = StackScreenProps<
  FriendsStackParamList,
  'Your Friends'
>;

type FriendProps = {
  friend: Friend;
  onSelected?: () => void;
};

function ShortFriendInfo({friend, onSelected}: FriendProps) {
  return (
    <TouchableOpacity style={styles.friend} onPress={onSelected}>
      <Text style={styles.friendText}>{friend.username}</Text>
    </TouchableOpacity>
  );
}

function FriendsList({
  navigation,
}: {
  navigation: StackNavigationProp<FriendsStackParamList, 'Your Friends'>;
}) {
  const [viewFriend, setViewFriend] = React.useState<Friend | null>(null);
  const {data: friendInvitations} = useGetFriendsRequestsReceivedQuery();
  const {data: friends, refetch, isLoading} = useGetFriendsQuery();
  const [unfriend] = useRemoveFriendMutation();

  return (
    <View style={styles.friendsList}>
      {friendInvitations && friendInvitations.length > 0 ? (
        <SecondaryButton
          title="Pending Friend Invitations"
          onPress={() => navigation.navigate('Invitations')}
        />
      ) : (
        ''
      )}
      {friends && friends.length > 0 ? (
        <View>
          <Modal
            animationType="slide"
            visible={!!viewFriend}
            onRequestClose={() => setViewFriend(null)}>
            <View style={styles.friendInfoModal}>
              {viewFriend !== null ? (
                <ProfileSummary username={viewFriend.username}>
                  <SecondaryButton
                    title="Unfriend"
                    onPress={() => {
                      unfriend(viewFriend.username);
                      setViewFriend(null);
                    }}
                  />
                </ProfileSummary>
              ) : (
                ''
              )}
            </View>
          </Modal>
          <FlatList
            data={friends}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{height: '100%', width: '100%'}}
            renderItem={({item}) => (
              <ShortFriendInfo
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
          Add more friends to see your friends here
        </Text>
      )}
    </View>
  );
}

export default function FriendsListScreen({
  navigation,
}: FriendsListScreenProps): JSX.Element {
  return (
    <View>
      <Section title="Invitations">
        <FriendsInvitationList />
      </Section>
      <Section title="Your Friends">
        <FriendsList navigation={navigation} />
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  friendsList: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  friend: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  friendText: {
    fontSize: 20,
    color: 'gray',
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
