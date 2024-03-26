import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {useGetDashboardInfoQuery} from './api';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStack';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {PRIMARY_GREEN, BLACK} from '../colors';
import {TEXT_LARGER, BUTTON_BORDERRADIUS} from '../sizing';

type DashboardScreenProps = StackScreenProps<HomeStackParamList, 'Dashboard'>;

export default function DashboardScreen({navigation}: DashboardScreenProps) {
  const {data, isLoading} = useGetDashboardInfoQuery();

  // User's scores
  const totalScore = data ? data.score : 0;
  const sustainabilityScore = data ? data.average_sustainability_score : 0;
  const nutritionScore = data ? data.average_nutri_score : 0;

  console.log(data);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

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
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard </Text>
      <TouchableOpacity onPress={openModal}>
        <AnimatedCircularProgress
          size={200}
          width={20}
          fill={totalScore / 10}
          tintColor={PRIMARY_GREEN}
          backgroundColor="#DDD"
          padding={10}
          rotation={0}>
          {fill => (
            <Text style={styles.progressText}>{`${totalScore / 10}/100`}</Text>
          )}
        </AnimatedCircularProgress>
      </TouchableOpacity>

      <Text style={styles.scoreLabel}>Sustainability Score</Text>

      <ProgressBar current={4} total={7} />
      <Text style={styles.nutritionScoreLabel}>
        {`Your Nutrition Score ${nutritionScore}/100`}
      </Text>

      <Text style={styles.infoText}>
        Scan sustainable products & complete quizzes to earn points
      </Text>
      <Text style={styles.infoText}>View your past scanned items below</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Saved Items')}>
        <Text style={styles.buttonText}>Scanned Items</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Leaderboard')}>
        <Text style={styles.buttonText}>See the Leaderboard</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Sustainability Score Details</Text>
            <Text style={styles.modalSustainabilityDescription}>
              This is your total score, comprised of 60% of points gained in
              quizzes and 40% from the average sustainability rating of your
              past scanned products.
            </Text>
            <TouchableOpacity style={[styles.button]} onPress={closeModal}>
              <Text style={styles.buttonText}>Hide Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: TEXT_LARGER,
    fontFamily: 'Pacifico-Regular',
    marginLeft: 10,
    marginRight: 10,
    color: BLACK,
  },
  progressText: {
    fontFamily: 'Pacifico-Regular',
    fontSize: 24,
    color: '#666',
  },
  scoreLabel: {
    fontSize: 16,
    marginVertical: 5,
  },
  nutritionScoreLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#666',
  },
  infoText: {
    fontSize: 18,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: PRIMARY_GREEN,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '60%',
    borderRadius: BUTTON_BORDERRADIUS,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: BUTTON_BORDERRADIUS,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalSustainabilityDescription: {
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 20,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
  progressContainer: {
    width: '60%',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginTop: 20,
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
});
