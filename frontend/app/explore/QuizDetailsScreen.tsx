import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useGetQuestionQuery} from './api';
import {Animated} from 'react-native';
import {PRIMARY_GREEN} from '../colors';

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
    }).start(() => {
      setTimeout(() => {
        setShowExplanation(false);
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start();

        const nextQuestionId = currentQuestionId + 1;
        setSelectedAnswer(null);
        if (nextQuestionId <= 6) {
          navigation.navigate('QuizDetailsScreen', {
            quizId: quizId,
            quizTopic: quizTopic,
            questionId: nextQuestionId,
          });
          setCurrentQuestionId(nextQuestionId);
        } else {
          navigation.navigate('ResultsScreen', {
            correctAnswersCount: correctAnswersCount + (isCorrect ? 1 : 0),
          });
        }
      }, 1000);
    });
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
        navigation.navigate('ResultsScreen', {
          correctAnswersCount: correctAnswersCount,
        });
      }
    });
  };

  const renderAnswerButtons = answers => {
    return answers.map((answer, index) => (
      <View key={index} style={styles.answerButton}>
        {selectedAnswer === index && (
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: index === data.answer ? PRIMARY_GREEN : 'red',
                opacity: opacityAnim,
                borderRadius: 25,
              },
            ]}
          />
        )}
        <TouchableOpacity
          onPress={() => handleAnswerPress(answer, index)}
          disabled={selectedAnswer !== null}>
          <Text style={styles.answerText}>{answer}</Text>
        </TouchableOpacity>
      </View>
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{quizTopic}</Text>
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
    fontWeight: 'bold',
    marginVertical: 20,
  },
  question: {
    fontSize: 22,
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
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 10,
  },
  answerText: {
    fontSize: 18,
    color: '#000',
  },

  explanationContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
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
});

export default QuizDetailsScreen;
