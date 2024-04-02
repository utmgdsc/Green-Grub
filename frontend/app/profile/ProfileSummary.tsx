/* eslint-disable react-native/no-inline-styles */
import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Card from '../Card';
import {useGetOtherUserQuery} from '../login/api';
import {TEXT_LARGE} from '../sizing';

type ProfileSummaryProps = PropsWithChildren<{
  username: string;
}>;

type ProfileImageProps = {
  uri: string;
  size: number;
};

function ProfileImage({uri, size}: ProfileImageProps) {
  return (
    <Image
      source={{uri}}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        paddingHorizontal: 20,
      }}
    />
  );
}

export default function ProfileSummary({
  username,
  children,
}: ProfileSummaryProps) {
  const {data: user, isLoading} = useGetOtherUserQuery(username);

  if (isLoading || !user) {
    return null;
  }

  return (
    <Card>
      <View style={{width: '100%', alignItems: 'center'}}>
        <ProfileImage uri={user.extra_info.avatar_url} size={100} />
        <Text style={styles.usernameText}>{username}</Text>
        {children}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  usernameText: {
    marginVertical: 30,
    fontSize: TEXT_LARGE,
    color: 'black',
  },
});
