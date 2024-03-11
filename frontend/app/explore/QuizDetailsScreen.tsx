import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const QuizDetailsScreen = () => {
  // Dummy data for the quiz
  const question = 'How much does a household in Canada waste food?';
  const answers = ['50 kg', '100 kg', '120 kg'];
  const currentQuestion = 2;
  const totalQuestions = 6;

  const handleAnswerPress = answer => {
    // Handle the answer selection
  };

  const renderAnswerButtons = () => {
    return answers.map((answer, index) => (
      <TouchableOpacity
        key={index}
        style={styles.answerButton}
        onPress={() => handleAnswerPress(answer)}>
        <Text style={styles.answerText}>{answer}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Quizzes</Text>
      <Text style={styles.category}>Food Waste</Text>
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBar,
            {width: `${(currentQuestion / totalQuestions) * 100}%`},
          ]}
        />
      </View>
      <Text style={styles.progressText}>
        {currentQuestion}/{totalQuestions}
      </Text>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.answersContainer}>{renderAnswerButtons()}</View>
    </View>
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
  category: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  progressBarBackground: {
    width: '100%',
    height: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'black',
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    textAlign: 'center',
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
});

export default QuizDetailsScreen;
