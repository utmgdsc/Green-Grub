import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';
import {TEXT_LARGE} from '../sizing';
import RatingBar, {RatingBarGroup} from '../RatingBar';
import {useGetProductInfoQuery} from './api';
import FoodInfo from '../types/FoodInfo';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScanStackParamList} from './ScanTab';

type ScanResultScreenProps = StackScreenProps<
  ScanStackParamList,
  'Product Information'
>;

function ProductInformation({product}: {product: FoodInfo}) {
  return (
    <View style={styles.productInformation}>
      {product.image ? (
        <Image src={product.image} style={styles.productImage} />
      ) : (
        <View style={styles.productImage}>
          <Icon name="warning-outline" size={80} color="black" />
          <Text style={styles.productNotFoundText}>Image not available</Text>
        </View>
      )}

      <Text style={styles.productNameText}>{product.product_name}</Text>
      <RatingBarGroup>
        <RatingBar
          label="Nutri Score"
          min={0}
          max={5}
          actual={product.nutri_score}
        />
        <RatingBar
          label="Sustainability Score"
          min={0}
          max={5}
          actual={product.sustainability}
        />
      </RatingBarGroup>
    </View>
  );
}

export default function ScanResultScreen({
  navigation,
  route,
}: ScanResultScreenProps) {
  const {data: product, isLoading} = useGetProductInfoQuery(
    route.params.barcode,
  );

  return (
    <View style={styles.container}>
      <View style={styles.productInformationContainer}>
        {isLoading || !product ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : !product.product_name ? (
          <View style={styles.productNotFound}>
            <Icon name="warning-outline" size={200} color="black" />
            <Text style={styles.productNotFoundText}>Product not found</Text>
          </View>
        ) : (
          <ProductInformation product={product} />
        )}
      </View>
      <ButtonGroup>
        <MainButton title="Retake" onPress={() => navigation.goBack()} />
        <MainButton
          title="Add to Saved Items"
          onPress={() => navigation.goBack()}
        />
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
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productNameText: {
    fontSize: TEXT_LARGE,
    fontWeight: 'bold',
    color: 'black',
  },
  productNotFound: {
    paddingVertical: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productNotFoundText: {
    fontSize: TEXT_LARGE,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});
