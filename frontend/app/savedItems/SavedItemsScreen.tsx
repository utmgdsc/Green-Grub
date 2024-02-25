import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../App';
import ProductInformation, {
  Product,
  ShortProductInformationList,
} from '../ProductInformation';

type SavedItemsScreenProps = StackScreenProps<
  RootStackParamList,
  'Saved Items'
>;

const dummyProducts: Product[] = [
  {
    img: 'https://caffeinecam.com/cdn/shop/files/8c1e70ce69bbf30762cfe736b734537e2383ac9e0e917a9bdc3b828e7b6c2162__57752.1598296010.1280.1280.jpg?v=1689680456&width=180',
    name: 'Lays Chips',
    nutriScore: 8.1,
    sustainabilityScore: 7.3,
  },
  {
    img: 'https://cdn.gardengrocer.com/attachments/photos/big/959.jpg?7442',
    name: 'Coke',
    nutriScore: 4.1,
    sustainabilityScore: 2.3,
  },
  {
    img: 'https://caffeinecam.com/cdn/shop/files/8c1e70ce69bbf30762cfe736b734537e2383ac9e0e917a9bdc3b828e7b6c2162__57752.1598296010.1280.1280.jpg?v=1689680456&width=180',
    name: 'Lays Chips',
    nutriScore: 8.1,
    sustainabilityScore: 7.3,
  },
  {
    img: 'https://cdn.gardengrocer.com/attachments/photos/big/959.jpg?7442',
    name: 'Coke',
    nutriScore: 4.1,
    sustainabilityScore: 2.3,
  },
  {
    img: 'https://caffeinecam.com/cdn/shop/files/8c1e70ce69bbf30762cfe736b734537e2383ac9e0e917a9bdc3b828e7b6c2162__57752.1598296010.1280.1280.jpg?v=1689680456&width=180',
    name: 'Lays Chips',
    nutriScore: 8.1,
    sustainabilityScore: 7.3,
  },
  {
    img: 'https://cdn.gardengrocer.com/attachments/photos/big/959.jpg?7442',
    name: 'Coke',
    nutriScore: 4.1,
    sustainabilityScore: 2.3,
  },
  {
    img: 'https://caffeinecam.com/cdn/shop/files/8c1e70ce69bbf30762cfe736b734537e2383ac9e0e917a9bdc3b828e7b6c2162__57752.1598296010.1280.1280.jpg?v=1689680456&width=180',
    name: 'Lays Chips',
    nutriScore: 8.1,
    sustainabilityScore: 7.3,
  },
  {
    img: 'https://cdn.gardengrocer.com/attachments/photos/big/959.jpg?7442',
    name: 'Coke',
    nutriScore: 4.1,
    sustainabilityScore: 2.3,
  },
];

export default function SavedItemsScreen({}: SavedItemsScreenProps) {
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [productDetail, setProductDetail] = useState<Product | null>(null);

  useEffect(() => {
    setTimeout(() => setProductsLoaded(true), 1000);
  }, []);

  return (
    <>
      <Modal
        animationType="slide"
        visible={!!productDetail}
        onRequestClose={() => setProductDetail(null)}>
        {productDetail !== null ? (
          <ProductInformation product={productDetail} />
        ) : (
          ''
        )}
      </Modal>
      <View style={styles.container}>
        {productsLoaded ? (
          <ShortProductInformationList
            products={dummyProducts}
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
  loadingBox: {
    padding: 100,
  },
});
