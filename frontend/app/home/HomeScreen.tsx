import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';

type StartScreenProps = BottomTabScreenProps<MainTabsParamList, 'Home'>;

export default function HomeScreen({navigation}: StartScreenProps) {
  const username = useSelector(
    (state: RootState) => state.userReducer.username,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Hello, {username}!</Text>
      <ButtonGroup>
        <MainButton
          title="Saved Items"
          onPress={() => navigation.navigate('Saved Items')}
        />
      </ButtonGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'gray',
  },
});
