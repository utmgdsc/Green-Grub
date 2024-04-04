import React from 'react';


type ExploreScreenProps = StackScreenProps<QuizzesStackParamList, 'Explore'>;

export default function ExploreScreen({}: StartScreenProps) {
  return <Leaderboard />;
}
