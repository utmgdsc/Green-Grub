import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import SecondaryButton from '../shared/SecondaryButton';
import ProgressBar from '../shared/ProgressBar';
import {useGetDashboardInfoQuery} from './api';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStack';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {PRIMARY_GREEN, BLACK} from '../colors';
import {TEXT_LARGER, BUTTON_BORDERRADIUS} from '../sizing';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';

type DashboardScreenProps = StackScreenProps<HomeStackParamList, 'Dashboard'>;

export default function DashboardScreen({navigation}: DashboardScreenProps) {
  const {data, isLoading, refetch} = useGetDashboardInfoQuery();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  // User's scores
  const totalScore = data ? data.score : 0;
  const sustainabilityScore = data ? data.average_sustainability_score : 0;
  const nutritionScore = data ? data.average_nutri_score : 0;

  const [isSustainabilityModalVisible, setIsSustainabilityModalVisible] =
    useState(false);

  const [isNutritionModalVisible, setIsNutritionModalVisible] = useState(false);

  const openSustainabilityModal = () => {
    setIsSustainabilityModalVisible(true);
  };

  const closeSustainabilityModal = () => {
    setIsSustainabilityModalVisible(false);
  };

  const openNutritionModal = () => {
    setIsNutritionModalVisible(true);
  };

  const closeNutritionModal = () => {
    setIsNutritionModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard </Text>
      <TouchableOpacity onPress={openSustainabilityModal}>
        <AnimatedCircularProgress
          size={200}
          width={20}
          fill={totalScore / 10}
          tintColor={PRIMARY_GREEN}
          backgroundColor="#DDD"
          padding={10}
          rotation={0}>
          {fill => (
            <Text style={styles.progressText}>
              {totalScore > 1000
                ? 'You have surpassed 1000 points! Compete with friends on Leaderboard'
                : `${totalScore}/1000`}
            </Text>
          )}
        </AnimatedCircularProgress>
      </TouchableOpacity>
      <Text style={styles.scoreLabel}>Sustainability Score</Text>
      <View style={styles.progressContainer}>
        <ProgressBar current={nutritionScore} total={5} />
      </View>
      <TouchableOpacity onPress={openNutritionModal}>
        <Text style={styles.nutritionScoreLabel}>
          {`Your Nutrition Score ${nutritionScore}/5`}
        </Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>
        To earn more points scan sustainable products & complete quizzes
      </Text>
      <Text style={styles.infoText}>View your past scanned items below</Text>
      <ButtonGroup>
        <SecondaryButton
          title="Saved Items"
          onPress={() => navigation.navigate('Saved Items')}
        />

        <SecondaryButton
          title="See the Leaderboard"
          onPress={() => navigation.navigate('Leaderboard')}
        />
      </ButtonGroup>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isSustainabilityModalVisible}
        onRequestClose={closeSustainabilityModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Sustainability Score Details</Text>
            <Text style={styles.modalSustainabilityDescription}>
              This is your total score, comprised of 60% of points gained in
              quizzes and 40% from the average sustainability rating of your
              past scanned products.
            </Text>
            <TouchableOpacity
              style={[styles.button]}
              onPress={closeSustainabilityModal}>
              <Text style={styles.buttonText}>Hide Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isNutritionModalVisible}
        onRequestClose={closeNutritionModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Nutrition Score Details</Text>
            <Text style={styles.modalNutritionDescription}>
              This is your average nutrition score from the past scanned items.
              It does not count towards your main score and is not used for
              comparisons in the leaderboard.
            </Text>
            <Text style={styles.modalNutritionDescription}>
              Keep the nutrition score high by scanning more nutritious
              products.
            </Text>
            <TouchableOpacity
              style={[styles.button]}
              onPress={closeNutritionModal}>
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
  progressContainer: {
    marginTop: 20,
    width: '60%',
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
  modalNutritionDescription: {
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 20,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
});
