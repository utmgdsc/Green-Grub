import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  ProductInformation,
  ShortProductInformationList,
} from '../ProductInformation';
import {HomeStackParamList} from '../home/HomeTab';
import {useGetSavedItemsQuery} from './api';
import FoodInfo from '../types/FoodInfo';
import Icon from 'react-native-vector-icons/Ionicons';
import {DARK_GRAY} from '../colors';
import {TEXT_SMALL, TEXT_XLARGE} from '../sizing';

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
        <TouchableWithoutFeedback onPress={() => setProductDetail(null)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.productDetailModal}>
                {productDetail !== null ? (
                  <ProductInformation
                    product={productDetail}
                    onClose={() => setProductDetail(null)}
                  />
                ) : (
                  ''
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.container}>
        <Text style={styles.mainTitleText}>Saved Items </Text>
        <Text style={styles.titleDescriptionText}>
          View the items you have scanned and added. Click on an item to view
          more information.
        </Text>
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
  mainTitleText: {
    fontFamily: 'Pacifico-Regular',
    color: 'black',
    fontSize: TEXT_XLARGE,
  },
  titleDescriptionText: {
    fontSize: TEXT_SMALL,
    marginHorizontal: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  container: {
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDetailModal: {
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    marginRight: 10,
    marginTop: 10,
  },
  loadingBox: {
    padding: 100,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
