import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useGetQuestionQuery} from './api';
import {useNavigation} from '@react-navigation/native';

const QuizDetailsScreen = ({route, navigation}) => {
  //   const navigation = useNavigation();
  const {quizId, quizTopic} = route.params;
  const [currentQuestionId, setCurrentQuestionId] = useState(
    route.params.questionId || 1,
  );
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [currentLearnMoreLink, setCurrentLearnMoreLink] = useState('');

  const {data, error, isLoading} = useGetQuestionQuery({
    quizId,
    questionId: currentQuestionId,
  });

  const handleAnswerPress = (answer, index) => {
    console.log(index);
    const isCorrect = index === data.answer;
    if (isCorrect) {
      setCorrectAnswersCount(prevCount => prevCount + 1);
    }
    setSelectedAnswer(answer);
    setCurrentExplanation(data.explanation);
    setCurrentLearnMoreLink(data.article_link);
    setShowExplanation(true);

    setTimeout(() => {
      setSelectedAnswer(null);
      setShowExplanation(false); // Hide explanation for the next question
      const nextQuestionId = currentQuestionId + 1;

      if (nextQuestionId <= 6) {
        // Navigate to the next question or the same screen with an incremented question ID
        navigation.navigate('QuizDetailsScreen', {
          quizId: quizId,
          quizTopic: quizTopic,
          questionId: nextQuestionId,
        });
        setCurrentQuestionId(nextQuestionId);
      } else {
        // If the last question has been answered, navigate to the Results Screen
        navigation.navigate('ResultsScreen', {
          correctAnswersCount: correctAnswersCount + (isCorrect ? 1 : 0),
        });
      }
    }, 1200); // Delay to allow for any necessary UI feedback
  };

  const renderAnswerButtons = answers => {
    return answers.map((answer, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.answerButton,
          selectedAnswer === answer ? styles.correctAnswer : {},
          selectedAnswer && selectedAnswer !== answer ? styles.wrongAnswer : {},
        ]}
        onPress={() => handleAnswerPress(answer, index)}
        disabled={selectedAnswer !== null}>
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

  // Assuming `data.answer` is the correct answer.
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
  correctAnswer: {
    backgroundColor: 'green',
  },
  wrongAnswer: {
    backgroundColor: 'red',
  },
});

export default QuizDetailsScreen;
