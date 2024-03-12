import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import MainButton from '../shared/MainButton';
import ButtonGroup from '../shared/ButtonGroup';
import {useGetProductInfoQuery} from './api';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScanStackParamList} from './ScanTab';
import {useUpdateSavedItemsMutation} from '../savedItems/api';
import {TEXT_LARGE} from '../sizing';
import {ProductInformation} from '../ProductInformation';

type ScanResultScreenProps = StackScreenProps<
  ScanStackParamList,
  'Product Information'
>;

export default function ScanResultScreen({
  navigation,
  route,
}: ScanResultScreenProps) {
  const {data: product, isLoading} = useGetProductInfoQuery(
    route.params.barcode,
  );
  const [update] = useUpdateSavedItemsMutation();

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
          onPress={() => {
            update(route.params.barcode);
            navigation.goBack();
          }}
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
