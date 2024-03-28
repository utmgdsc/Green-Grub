/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ExploreTab from './explore/ExploreTab';
import HomeTab from './home/HomeTab';
import ScanTab from './scan/ScanTab';
import FriendsTab from './friends/FriendsTab';
import ProfileScreen from './profile/ProfileScreen';
import CartTab, {CartStackParamList} from './cart/CartTab';
import {NavigatorScreenParams} from '@react-navigation/native';

export type MainTabsParamList = {
  'Home Tab': undefined;
  'Scan Tab': undefined;
  'Explore Tab': undefined;
  'Cart Tab': NavigatorScreenParams<CartStackParamList>;
  Friends: undefined;
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
        name="Cart Tab"
        component={CartTab}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({color, size}) => (
            <Icon name="cart" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="Friends"
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
