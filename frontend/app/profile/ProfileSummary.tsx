import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Card from '../Card';
import {useGetOtherUserQuery} from '../login/api';

type ProfileSummaryProps = PropsWithChildren<{
  username: string;
}>;

type ProfileImageProps = {
  uri: string;
};

function ProfileImage({uri}: ProfileImageProps) {
  return <Image source={{uri}} style={styles.field} />;
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
      <View>
        <ProfileImage uri={user.extra_info.avatar_url} />
      </View>
      <Text>{username}</Text>
      {children}
    </Card>
  );
}

const styles = StyleSheet.create({
  field: {
    width: 60,
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
});
