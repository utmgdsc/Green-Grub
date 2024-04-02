/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Modal, StyleSheet, View} from 'react-native';
import {
  ProductInformation,
  ShortProductInformationList,
} from '../ProductInformation';
import {CartStackParamList} from './CartTab';
import {useFinalizeCartMutation, useGetCartQuery} from './api';
import Section from '../Section';
import FoodInfo from '../types/FoodInfo';
import SecondaryButton from '../shared/SecondaryButton';

type CartInfoScreenProps = StackScreenProps<CartStackParamList, 'Cart Details'>;

export default function CartInfoScreen({
  route: {
    params: {cartId},
  },
}: CartInfoScreenProps) {
  const {data: cart} = useGetCartQuery(cartId);
  const [finalizeCart] = useFinalizeCartMutation();
  const [product, setProduct] = useState<FoodInfo | null>(null);

  return (
    <View style={{padding: 20, flex: 1, backgroundColor: 'white'}}>
      <Modal
        animationType="slide"
        visible={!!product}
        onRequestClose={() => setProduct(null)}>
        <View style={styles.productDetailModal}>
          {product !== null ? <ProductInformation product={product} /> : ''}
        </View>
      </Modal>
      <Section title="Cart">
        <SecondaryButton
          title="Complete"
          onPress={() => finalizeCart(cartId)}
        />
      </Section>
      <Section title="Products">
        <ShortProductInformationList
          products={cart?.items.map(i => i.product_details) ?? []}
          onSelected={setProduct}
        />
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  productDetailModal: {
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
