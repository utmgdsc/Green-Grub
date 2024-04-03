/* eslint-disable react-native/no-inline-styles */
import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Card from '../Card';
import {useGetOtherUserQuery, useGetReducedUserQuery} from '../login/api';
import {TEXT_LARGE, TEXT_MEDIUM} from '../sizing';
import Icon from 'react-native-vector-icons/AntDesign';

type ProfileSummaryProps = PropsWithChildren<{
  username: string;
}>;

type ProfileImageProps = {
  uri?: string;
  size: number;
};

export function ProfileImage({uri, size}: ProfileImageProps) {
  if (!uri || uri.endsWith('default.png')) {
    return (
      <View
        style={{
          backgroundColor: 'gray',
          opacity: 0.7,
          width: size,
          height: size,
          borderRadius: size / 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon name="question" color="white" size={size * (5 / 6)} />
      </View>
    );
  } else {
    return (
      <Image
        source={{uri}}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
      />
    );
  }
}

export function ReducedProfileSummary({
  username,
  children,
}: ProfileSummaryProps) {
  const {data: user, isLoading} = useGetReducedUserQuery(username);

  if (isLoading || !user) {
    return null;
  }

  return (
    <Card>
      <View style={{width: '100%', alignItems: 'center'}}>
        <ProfileImage uri={user.avatar_url} size={100} />
        <Text style={styles.usernameText}>{username}</Text>
        {children}
      </View>
    </Card>
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
    'First Name': user.first_name,
    'Last Name': user.last_name,
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
