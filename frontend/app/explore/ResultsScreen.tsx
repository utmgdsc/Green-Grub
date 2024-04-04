import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {PRIMARY_GREEN} from '../colors';
import {BUTTON_BORDERRADIUS} from '../sizing';

const ResultsScreen = ({route, navigation}) => {
  const {correctAnswersCount} = route.params;

  const getImageSource = () => {
    return correctAnswersCount > 3
      ? 'http://127.0.0.1:8000/assets/trophy.png'
      : 'http://127.0.0.1:8000/assets/failedtest.png';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quiz Results</Text>
      <Text style={styles.resultText}>
        {correctAnswersCount > 0
          ? `You got ${correctAnswersCount} out of 6 answers correct and earned ${
              correctAnswersCount * 10
            } points!`
          : `You got ${correctAnswersCount} out of 6 answers correct`}
      </Text>
      <Image source={{uri: getImageSource()}} style={styles.resultImage} />
      <Text style={styles.resultText}>
        {correctAnswersCount > 3
          ? 'Good work! You passed!'
          : 'Practice makes perfect. You did not pass this quiz'}
      </Text>

      <TouchableOpacity
        style={styles.backQuizzesButton}
        onPress={() => navigation.navigate('ExploreScreen')}>
        <Text style={styles.backQuizzesButtonText}>See Quizzes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
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
  resultImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  backQuizzesButton: {
    marginTop: 20,
    backgroundColor: PRIMARY_GREEN,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: BUTTON_BORDERRADIUS,
    alignSelf: 'center',
  },
  backQuizzesButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultsScreen;
