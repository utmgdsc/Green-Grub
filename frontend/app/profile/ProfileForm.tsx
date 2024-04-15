import React, {useState} from 'react';

import {ScrollView, StyleSheet, View, Text} from 'react-native';
import TextInputField, {TextInputGroup} from '../shared/TextInputField';
import ButtonGroup from '../shared/ButtonGroup';
import ImagePickerField from '../shared/ImagePickerField';
import MainButton from '../shared/MainButton';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {User, userApi} from '../login/api';
import {logout} from '../authSlice';
import {friendsApi} from '../friends/api';
import {scanApi} from '../scan/api';
import {TEXT_XLARGE, TEXT_SMALL} from '../sizing';
import {WHITE} from '../colors';

export default function ProfileForm({user}: {user: User}) {
  const dispatch = useDispatch<AppDispatch>();
  const authToken = useSelector((state: RootState) => state.auth.accessToken);
  const username = user.username;
  const [password, setLocalPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState(user.email);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [city, setCity] = useState(user.extra_info.city);
  const [country, setCountry] = useState(user.extra_info.country);
  const [imageUri, setImageUri] = useState(user.extra_info.avatar_url);

  async function handleUpdate() {
    const formData = new FormData();
    formData.append('avatar', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    });
    formData.append('username', username);
    if (password !== '') {
      formData.append('password', password);
    }
    formData.append('email', emailAddress);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('city', city);
    formData.append('country', country);

    await fetch('http://localhost:8000/api/update_user/', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    });
    dispatch(userApi.util.invalidateTags(['User']));
  }

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(friendsApi.util.resetApiState());
    dispatch(scanApi.util.resetApiState());
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <ScrollView style={{width: '100%'}}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Profile</Text>
        <Text
          style={{
            color: 'white',
            fontSize: TEXT_SMALL,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          {username}
        </Text>
      </View>
      <View style={styles.container}>
        <TextInputGroup>
          <TextInputField
            title="Email Address"
            onChangeText={setEmailAddress}
            value={emailAddress}
            isSecureText={false}
          />
          <TextInputField
            title="First Name"
            onChangeText={setFirstName}
            value={firstName}
            isSecureText={false}
          />
          <TextInputField
            title="Last Name"
            onChangeText={setLastName}
            value={lastName}
            isSecureText={false}
          />
          <TextInputField
            title="City"
            onChangeText={setCity}
            value={city}
            isSecureText={false}
          />
          <TextInputField
            title="Country"
            onChangeText={setCountry}
            value={country}
            isSecureText={false}
          />
          <TextInputField
            title="Password"
            onChangeText={setLocalPassword}
            value={password}
            isSecureText={true}
          />
          <ImagePickerField imageUri={imageUri} setImageUri={setImageUri} />
        </TextInputGroup>
        <ButtonGroup>
          <MainButton title="Update" onPress={handleUpdate} />
          <MainButton title="Log out" onPress={handleLogout} />
        </ButtonGroup>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingVertical: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: TEXT_XLARGE,
    fontFamily: 'Pacifico-Regular',
    color: WHITE,
  },
});
