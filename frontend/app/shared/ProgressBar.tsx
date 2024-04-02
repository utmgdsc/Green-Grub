import {StyleSheet, View} from 'react-native';

type ProgressBarProps = {
  current: number;
  total: number;
};

const ProgressBar = ({current, total}: ProgressBarProps) => {
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

const styles = StyleSheet.create({
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
});

export default ProgressBar;
