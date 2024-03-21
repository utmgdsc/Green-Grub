import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const ResultsScreen = ({route, navigation}) => {
  const {correctAnswersCount} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quiz Results</Text>
      <Text style={styles.resultText}>
        {correctAnswersCount > 4
          ? 'Good work! You passed!'
          : 'Unfortunately, you did not pass. Try again!'}
      </Text>
      <Text style={styles.resultText}>
        You got {correctAnswersCount} out of 6 answers correct!
      </Text>
      <Button
        title="See Quizzes"
        onPress={() => navigation.navigate('ExploreScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default ResultsScreen;
