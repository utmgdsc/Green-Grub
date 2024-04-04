import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../home/HomeTab';
import Leaderboard from './Leaderboard';

type LeaderboardScreenProps = StackScreenProps<
  HomeStackParamList,
  'Saved Items',
  'Leaderboard'
>;

export default function LeaderboardScreen({}: LeaderboardScreenProps) {
  return <Leaderboard />;
}
