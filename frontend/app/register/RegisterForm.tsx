/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import TextInputField, {TextInputGroup} from '../shared/TextInputField';
import ButtonGroup from '../shared/ButtonGroup';
import MainButton from '../shared/MainButton';
import {useDispatch} from 'react-redux';
import {saveAuthToken} from '../authSlice';
import {setUsername} from '../userSlice';
import {AppDispatch} from '../store';
import ImagePickerField from '../shared/ImagePickerField';

export default function RegisterForm({}) {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setLocalUsername] = useState('');
  const [password, setLocalPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [imageUri, setImageUri] = useState('');

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append('avatar', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      });
      formData.append('username', username);
      formData.append('password', password);
      formData.append('email', emailAddress);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('city', city);
      formData.append('country', country);

      await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        body: formData,
      });

      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const {refresh, access} = await response.json();

      if (access && refresh) {
        await dispatch(
          saveAuthToken({accessToken: access, refreshToken: refresh}),
        );
        dispatch(setUsername(username));
      } else {
        Alert.alert(
          'Error',
          'Registration succeeded but no token was received.',
        );
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert(
        'Registration Error',
        'An error occurred during registration.',
      );
    }
  };

  return (
    <ScrollView style={{width: '100%'}}>
      <View style={styles.container}>
        <TextInputGroup>
          <TextInputField
            title="Username"
            onChangeText={setLocalUsername}
            value={username}
            isSecureText={false}
          />
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
        <ButtonGroup style={{marginVertical: 20}}>
          <MainButton title="Register" onPress={handleRegister} />
        </ButtonGroup>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 30,
  },
});
