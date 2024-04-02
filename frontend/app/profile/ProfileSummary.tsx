/* eslint-disable react-native/no-inline-styles */
import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Card from '../Card';
import {useGetOtherUserQuery} from '../login/api';
import {TEXT_LARGE, TEXT_MEDIUM} from '../sizing';

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

  const {extra_info: extra_info_} = user;
  let extra_info = {...extra_info_};
  const info = {
    City: extra_info.city,
    Country: extra_info.country,
  };

  return (
    <Card>
      <View style={{width: '100%', alignItems: 'center'}}>
        <ProfileImage uri={user.extra_info.avatar_url} size={100} />
        <Text style={styles.usernameText}>{username}</Text>
        <View style={{width: '100%', marginVertical: 30, gap: 10}}>
          {Object.entries(info).map(([key, value]) => (
            <View key={key} style={styles.fieldContainer}>
              <Text style={styles.fieldHeaderText}>{key}</Text>
              <Text style={styles.fieldText}>{value}</Text>
            </View>
          ))}
        </View>
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
  fieldContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  fieldHeaderText: {
    fontSize: TEXT_MEDIUM,
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
  },
  fieldText: {
    fontSize: TEXT_MEDIUM,
    color: 'black',
    flex: 1,
  },
});
