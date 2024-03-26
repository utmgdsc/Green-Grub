import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {
  ProductInformation,
  ShortProductInformationList,
} from '../ProductInformation';
import {HomeStackParamList} from '../home/HomeTab';
import {useGetSavedItemsQuery} from './api';
import FoodInfo from '../types/FoodInfo';

type SavedItemsScreenProps = StackScreenProps<
  HomeStackParamList,
  'Saved Items',
  'Leaderboard'
>;

export default function SavedItemsScreen({}: SavedItemsScreenProps) {
  const [productDetail, setProductDetail] = useState<FoodInfo | null>(null);
  const {data: products, isLoading} = useGetSavedItemsQuery();

  return (
    <>
      <Modal
        animationType="slide"
        visible={!!productDetail}
        onRequestClose={() => setProductDetail(null)}>
        <View style={styles.productDetailModal}>
          {productDetail !== null ? (
            <ProductInformation product={productDetail} />
          ) : (
            ''
          )}
        </View>
      </Modal>
      <View style={styles.container}>
        {!isLoading && products !== undefined ? (
          <ShortProductInformationList
            products={products}
            onSelected={setProductDetail}
          />
        ) : (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDetailModal: {
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  loadingBox: {
    padding: 100,
  },
});
