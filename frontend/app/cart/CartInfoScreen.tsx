/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Modal, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {
  ProductInformation,
  ShortProductInformationList,
} from '../ProductInformation';
import {CartStackParamList} from './CartTab';
import {
  useFinalizeCartMutation,
  useGetCartQuery,
  useModifyCartMutation,
  useUpdateCartNameMutation,
} from './api';
import Section from '../Section';
import FoodInfo from '../types/FoodInfo';
import SecondaryButton from '../shared/SecondaryButton';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabsParamList} from '../MainTabs';
import {CompositeScreenProps} from '@react-navigation/native';

type CartInfoScreenProps = CompositeScreenProps<
  StackScreenProps<CartStackParamList, 'Cart Details'>,
  BottomTabScreenProps<MainTabsParamList>
>;

export default function CartInfoScreen({
  route: {
    params: {cartId},
  },
  navigation,
}: CartInfoScreenProps) {
  const {data: cart} = useGetCartQuery(cartId);
  const [finalizeCart_] = useFinalizeCartMutation();
  const [updateCartName] = useUpdateCartNameMutation();
  const [modifyCart] = useModifyCartMutation();
  const [product, setProduct] = useState<FoodInfo | null>(null);
  const cartName = cart?.name ?? `Cart ${cartId}`;

  function finalizeCart() {
    finalizeCart_(cartId);
    setProduct(null);
  }

  return (
    <View style={{padding: 20, flex: 1, backgroundColor: 'white'}}>
      <Modal
        animationType="slide"
        visible={!!product}
        onRequestClose={() => setProduct(null)}>
        <TouchableWithoutFeedback onPress={() => setProduct(null)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.productDetailModal}>
                {product !== null ? (
                  <ProductInformation product={product} />
                ) : (
                  ''
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Section
        title={cartName}
        editable={true}
        onConfirm={name => updateCartName({cart_id: cartId, name})}>
        {!cart?.finalized && (cart?.items.length ?? 0) > 0 ? (
          <SecondaryButton title="Complete" onPress={() => finalizeCart()} />
        ) : !cart?.finalized && (cart?.items.length ?? 1) === 0 ? (
          <SecondaryButton
            title="Scan Items to Add"
            onPress={() => navigation.navigate('Scan Tab')}
          />
        ) : null}
      </Section>
      <Section title="Products">
        <ShortProductInformationList
          products={cart?.items.map(i => i.product_details) ?? []}
          onSelected={setProduct}
          onDeleted={
            !cart?.finalized ?? false
              ? prod =>
                  modifyCart({
                    cart_id: cartId,
                    barcode: prod.barcode,
                    change_amount: -1,
                  })
              : undefined
          }
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
