import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import ExploreTab, {QuizzesStackParamList} from './ExploreTab';
import {useGetTopicsQuery} from './api';
import {StackScreenProps} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {BLACK} from '../colors';
import {TEXT_LARGER, BUTTON_BORDERRADIUS} from '../sizing';
import {useIsFocused} from '@react-navigation/native';

type ExploreScreenProps = StackScreenProps<QuizzesStackParamList, 'Explore'>;

type TopicProps = {
  topic_id: number;
  topic_title: string;
  topic_image: string;
  passed_quizzes: number;
  total_quizzes: number;
  navigation: ExploreScreenProps['navigation'];
};

function Topic({
  topic_id,
  topic_title,
  topic_image,
  passed_quizzes,
  total_quizzes,
}: TopicProps) {
  const navigation = useNavigation();

  const progressWidth =
    total_quizzes > 0 ? `${(passed_quizzes / total_quizzes) * 100}%` : '0%';

  const handlePress = () => {
    console.log(navigation);
    navigation.navigate('QuizListScreen', {topicId: topic_id});
  };
  const isFocused = useIsFocused();

  return (
    <TouchableOpacity style={styles.topicSection} onPress={handlePress}>
      <ImageBackground
        source={{uri: topic_image}}
        style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <Text style={styles.buttonText}>
          {topic_title} ({passed_quizzes}/{total_quizzes})
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function ExploreScreen({}) {
  const {data, isLoading, refetch} = useGetTopicsQuery();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Explore Topics</Text>
      {isLoading && <Text>Loading...</Text>}
      {!data && <Text>No topics found</Text>}
      {data?.map((topic: TopicProps) => (
        <Topic
          key={topic.topic_id}
          topic_id={topic.topic_id}
          topic_title={topic.topic_title}
          topic_image={topic.topic_image}
          passed_quizzes={topic.passed_quizzes}
          total_quizzes={topic.total_quizzes}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: TEXT_LARGER,
    textAlign: 'center',
    fontFamily: 'Pacifico-Regular',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    color: BLACK,
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 24,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center', // Align children components
  },
  topicSection: {
    height: 140,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 22,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#000',
    textShadowColor: 'rgba(255, 255, 255, 0.4)', // White shadow for darker text
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
    marginBottom: 4,
    paddingLeft: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
  },
  subText: {
    fontSize: 16,
    paddingLeft: 20,
  },
  progressContainer: {
    height: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 10,
  },
});

export default ExploreScreen;
