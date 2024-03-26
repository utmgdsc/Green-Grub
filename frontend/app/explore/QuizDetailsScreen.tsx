import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import {useGetQuestionQuery} from './api';
import {Animated} from 'react-native';
import {usePostQuizResultsMutation} from './api';
import {PRIMARY_GREEN} from '../colors';
import { BUTTON_BORDERRADIUS } from '../sizing';

const QuizDetailsScreen = ({route, navigation}) => {
  const {quizId, quizTopic} = route.params;
  const [currentQuestionId, setCurrentQuestionId] = useState(
    route.params.questionId || 1,
  );
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [currentLearnMoreLink, setCurrentLearnMoreLink] = useState('');
  const [postQuizResults, {postSata, postIsLoading, postError}] =
    usePostQuizResultsMutation();
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const {data, error, isLoading} = useGetQuestionQuery({
    quizId,
    questionId: currentQuestionId,
  });

  const handleAnswerPress = (answer, index) => {
    const isCorrect = index === data.answer;
    setSelectedAnswer(index);
    setCurrentExplanation(data.explanation);
    setCurrentLearnMoreLink(data.article_link);
    setShowExplanation(true);

    if (isCorrect) {
      setCorrectAnswersCount(prevCount => prevCount + 1);
    }

    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const submitResults = async () => {
    try {
      const payload = {quizId: quizId, score: correctAnswersCount};
      const result = await postQuizResults(payload).unwrap();
      console.log('Submission successful', result);
    } catch (err) {
      console.error('Failed to submit quiz results', err);
    }
  };

  const goToNextQuestion = () => {
    const nextQuestionId = currentQuestionId + 1;
    setSelectedAnswer(null);
    setShowExplanation(false);
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      if (nextQuestionId <= 6) {
        navigation.navigate('QuizDetailsScreen', {
          quizId: quizId,
          quizTopic: quizTopic,
          questionId: nextQuestionId,
        });
        setCurrentQuestionId(nextQuestionId);
      } else {
        submitResults();
        navigation.navigate('ResultsScreen', {
          correctAnswersCount: correctAnswersCount,
        });
      }
    });
  };

  const renderAnswerButtons = answers => {
    return answers.map((answer, index) => (
      <TouchableOpacity
        key={index}
        style={styles.answerButton}
        onPress={() => handleAnswerPress(answer, index)}
        disabled={selectedAnswer !== null}>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor:
                selectedAnswer === index
                  ? index === data.answer
                    ? PRIMARY_GREEN
                    : '#E84747'
                  : 'transparent',
              opacity: opacityAnim,
              borderRadius: 15,
            },
          ]}
        />
        <Text style={styles.answerText}>{answer}</Text>
      </TouchableOpacity>
    ));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error occurred!</Text>
      </View>
    );
  }

  const answers = data ? [data.option1, data.option2, data.option3] : [];

  const ProgressBar = ({current, total}) => {
    const progress = current / total;
    let backgroundColor;

    if (progress < 0.34) {
      backgroundColor = '#E84747'; // Red for low progress
    } else if (progress < 0.67) {
      backgroundColor = '#FAC213'; // Yellow for medium progress
    } else {
      backgroundColor = '#4CAF50'; // Green for high progress
    }

    return (
      <View style={styles.progressContainer}>
        <Text
          style={styles.progressText}>{`Question ${current} of ${total}`}</Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {width: `${progress * 100}%`, backgroundColor},
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProgressBar current={currentQuestionId} total={6} />
      <Text style={styles.question}>{data?.question}</Text>
      <View style={styles.answersContainer}>
        {renderAnswerButtons(answers)}
      </View>
      {showExplanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationText}>{currentExplanation}</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(currentLearnMoreLink)}>
            <Text style={styles.learnMoreText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      )}
      {showExplanation && (
        <TouchableOpacity
          style={styles.nextQuestionButton}
          onPress={goToNextQuestion}>
          <Text style={styles.nextQuestionButtonText}>Next Question</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 22,
    marginVertical: 20,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBarContainer: {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 18,
    color: '#000',
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  answersContainer: {
    width: '100%',
  },
  answerButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 15,
    fontWeight: 'bold',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 10,
  },
  answerText: {
    fontSize: 18,
    color: '#000',
  },

  explanationContainer: {
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  explanationText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    lineHeight: 24,
  },
  learnMoreText: {
    fontSize: 16,
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
  nextQuestionButton: {
    marginTop: 20,
    backgroundColor: PRIMARY_GREEN,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: BUTTON_BORDERRADIUS,
    alignSelf: 'center',
  },
  nextQuestionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizDetailsScreen;
