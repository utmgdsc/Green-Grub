/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeTab from './home/HomeTab';
import ExploreScreen from './explore/ExploreScreen';
import ScanTab from './scan/ScanTab';
import FriendsTab from './friends/FriendsTab';
import ProfileScreen from './profile/ProfileScreen';

export type MainTabsParamList = {
  'Home Tab': undefined;
  'Scan Tab': undefined;
  Explore: undefined;
  'Friends Tab': undefined;
  Profile: undefined;
};

const Tabs = createBottomTabNavigator<MainTabsParamList>();

function App(): React.JSX.Element {
  return (
    <Tabs.Navigator screenOptions={{headerShown: false}}>
      <Tabs.Screen
        name="Home Tab"
        component={HomeTab}
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
        name="Explore"
        component={ExploreScreen}
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
