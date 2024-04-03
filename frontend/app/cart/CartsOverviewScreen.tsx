/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {CartStackParamList} from './CartTab';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  Cart,
  useActiveCart,
  useCreateCartMutation,
  useGetAllCartsQuery,
} from './api';
import {TouchableOpacity} from 'react-native';
import {TEXT_MEDIUM, TEXT_XLARGE, TEXT_SMALL} from '../sizing';
import SecondaryButton from '../shared/SecondaryButton';
import Section from '../Section';

type CartOverviewScreenProps = StackScreenProps<CartStackParamList, 'Carts'>;

type ShortCartInformationProps = {
  cart: Cart;
  onSelected?: () => void;
};
type ShortCartInformationListProps = {
  carts: Cart[];
  onSelected?: (cart: Cart) => void;
};

export function ShortCartInformation({
  cart,
  onSelected,
}: ShortCartInformationProps) {
  const cartName = cart.name ?? `Cart ${cart.id}`;

  return (
    <TouchableOpacity style={styles.shortCartInformation} onPress={onSelected}>
      <Text style={styles.shortCartInformationHeaderText}>{cartName}</Text>
      <Text style={styles.shortCartInformationText}>
        {cart.items.length} items
      </Text>
    </TouchableOpacity>
  );
}

export function ShortCartInformationList({
  carts,
  onSelected,
}: ShortCartInformationListProps) {
  return (
    <FlatList
      contentContainerStyle={styles.shortCartInformationList}
      style={styles.shortCartInformationListContainer}
      renderItem={({item: cart}) => (
        <ShortCartInformation
          cart={cart}
          onSelected={onSelected ? () => onSelected(cart) : undefined}
        />
      )}
      data={carts}
    />
  );
}

export default function CartOverviewScreen({
  navigation,
}: CartOverviewScreenProps) {
  const {data: carts, isFetching, refetch} = useGetAllCartsQuery();
  const [createCart] = useCreateCartMutation();
  const activeCart = useActiveCart();
  const oldCarts = carts?.filter(cart => cart.finalized);

  return (
    <View
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
        flex: 1,
      }}>
      <Text style={styles.mainTitleText}>Carts </Text>
      <Text style={styles.titleDescriptionText}>
        View the shopping carts or create a new cart to start adding items.
      </Text>
      <Section title="Active Cart">
        {isFetching ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : activeCart ? (
          <View style={styles.activeCartView}>
            <ShortCartInformation
              cart={activeCart}
              onSelected={() =>
                navigation.navigate('Cart Details', {cartId: activeCart.id})
              }
            />
          </View>
        ) : (
          <View style={{padding: 20, gap: 20}}>
            <Text style={styles.noCartsFound}>You have no active carts</Text>
            <SecondaryButton title="Create Cart" onPress={() => createCart()} />
          </View>
        )}
      </Section>
      <Section title="Completed Carts">
        {isFetching ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : oldCarts && oldCarts.length > 0 ? (
          <ShortCartInformationList
            carts={oldCarts}
            onSelected={cart =>
              navigation.navigate('Cart Details', {cartId: cart.id})
            }
          />
        ) : (
          <View style={{padding: 20, gap: 20}}>
            <Text style={styles.noCartsFound}>You have no completed cards</Text>
            <SecondaryButton title="Refresh" onPress={refetch} />
          </View>
        )}
      </Section>
    </View>
  );
}

const styles = StyleSheet.create({
  mainTitleText: {
    fontFamily: 'Pacifico-Regular',
    color: 'black',
    fontSize: TEXT_XLARGE,
    textAlign: 'center',
  },
  titleDescriptionText: {
    fontSize: TEXT_SMALL,
    marginHorizontal: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  activeCartView: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  shortCartInformationList: {
    width: '90%',
    alignSelf: 'center',
  },
  shortCartInformationListContainer: {
    width: '100%',
  },
  shortCartInformation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    margin: 5,
    borderColor: 'lightgray',
    borderWidth: 2,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 8,
  },
  shortCartInformationImage: {
    width: 50,
    height: 50,
    flex: 1,
  },
  shortCartInformationHeaderText: {
    fontSize: TEXT_MEDIUM,
    color: 'black',
  },
  shortCartInformationText: {
    fontSize: TEXT_SMALL,
    color: 'black',
    fontStyle: 'italic',
  },
  noCartsFound: {
    fontSize: TEXT_MEDIUM,
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'center',
  },
});
