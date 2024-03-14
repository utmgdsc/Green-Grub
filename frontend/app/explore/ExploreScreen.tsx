import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';
import Leaderboard from './Leaderboard';

type StartScreenProps = BottomTabScreenProps<MainTabsParamList, 'Explore'>;

export default function ExploreScreen({}: StartScreenProps) {
  return <Leaderboard />;
}
