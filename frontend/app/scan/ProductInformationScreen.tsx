import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';
import {TEXT_LARGE} from '../sizing';
import RatingBar, {RatingBarGroup} from '../RatingBar';

type ScanResultScreenProps = StackScreenProps<
  RootStackParamList,
  'Product Information'
>;

const sample = {
  img: 'https://caffeinecam.com/cdn/shop/files/8c1e70ce69bbf30762cfe736b734537e2383ac9e0e917a9bdc3b828e7b6c2162__57752.1598296010.1280.1280.jpg?v=1689680456&width=180',
  name: 'Lays Chips',
  nutriScore: 8.1,
  sustainabilityScore: 7.3,
};

function ProductInformation({product}: {product: typeof sample}) {
  return (
    <View style={styles.productInformation}>
      <Image src={product.img} style={styles.productImage} />
      <Text style={styles.productNameText}>{product.name}</Text>
      <RatingBarGroup>
        <RatingBar
          label="Nutri Score"
          min={0}
          max={10}
          actual={product.nutriScore}
        />
        <RatingBar
          label="Sustainability Score"
          min={0}
          max={10}
          actual={product.sustainabilityScore}
        />
      </RatingBarGroup>
    </View>
  );
}

export default function ScanResultScreen({
  navigation,
  route,
}: ScanResultScreenProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.productInformationContainer}>
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <ProductInformation product={sample} />
        )}
        <Text style={styles.scanResultText}>{route.params.barcode}</Text>
      </View>
      <ButtonGroup>
        <MainButton title="Retake" onPress={() => navigation.goBack()} />
        <MainButton title="Record" />
      </ButtonGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanResultText: {
    color: 'black',
  },
  loadingBox: {
    padding: 100,
  },
  productInformationContainer: {
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  productInformation: {
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'column',
    gap: 20,
    padding: 20,
    margin: 20,
    width: '100%',
  },
  productImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  productNameText: {
    fontSize: TEXT_LARGE,
    fontWeight: 'bold',
  },
});
