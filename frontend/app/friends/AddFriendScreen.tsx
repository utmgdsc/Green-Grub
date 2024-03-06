import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FriendsStackParamList} from './FriendsScreen';
import {StackScreenProps} from '@react-navigation/stack';
import TextInputField from '../shared/TextInputField';
import MainButton from '../shared/MainButton';

type AddFriendScreenProps = StackScreenProps<
  FriendsStackParamList,
  'Add Friend'
>;

export default function AddFriendScreen({
  navigation,
}: AddFriendScreenProps): JSX.Element {
  const [username, setUsername] = useState('');

  return (
    <View style={styles.container}>
      <TextInputField
        title="Username"
        onChangeText={setUsername}
        value={username}
      />
      <MainButton
        title="Add Friend"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
