/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './home/HomeScreen';
import ExploreTab from './explore/ExploreTab';
import ScanTab from './scan/ScanTab';
import FriendsTab from './friends/FriendsTab';
import ProfileScreen from './profile/ProfileScreen';
import QuizListScreen from './explore/QuizListScreen';
import QuizDetailsScreen from './explore/QuizDetailsScreen';

export type MainTabsParamList = {
  Home: undefined;
  'Scan Tab': undefined;
  'Explore Tab': undefined;
  'Saved Items': undefined;
  'Friends Tab': undefined;
  Profile: undefined;
};

const Tabs = createBottomTabNavigator<MainTabsParamList>();

function App(): React.JSX.Element {
  return (
    <Tabs.Navigator screenOptions={{headerShown: false}}>
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Scan Tab"
        component={ScanTab}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="scan" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Explore Tab"
        component={ExploreTab}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="compass-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Friends Tab"
        component={FriendsTab}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="people" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default App;
