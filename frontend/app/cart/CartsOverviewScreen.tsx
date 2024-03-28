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
import {Cart, useGetAllCartsQuery} from './api';
import {TouchableOpacity} from 'react-native';
import {TEXT_LARGE} from '../sizing';

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
  return (
    <TouchableOpacity style={styles.shortCartInformation} onPress={onSelected}>
      <Text style={styles.shortCartInformationText}>
        {`Cart ${cart.id} - ${cart.items.length} items`}
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

export default function CartOverviewScreen({}: CartOverviewScreenProps) {
  const {data: carts, isFetching} = useGetAllCartsQuery();
  return (
    <View>
      {!isFetching && carts ? (
        <ShortCartInformationList carts={carts} />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    gap: 10,
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
  shortCartInformationText: {
    fontSize: TEXT_LARGE,
    flex: 6,
    color: 'black',
  },
});
