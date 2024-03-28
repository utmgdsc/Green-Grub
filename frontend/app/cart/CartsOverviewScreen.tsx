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
import MainButton from '../shared/MainButton';

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
  const {data: carts, isFetching, refetch} = useGetAllCartsQuery();
  return (
    <View>
      {isFetching ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : carts && carts.length > 0 ? (
        <ShortCartInformationList carts={carts} />
      ) : (
        <View style={{padding: 20, gap: 20}}>
          <Text style={styles.noCartsFound}>No carts found</Text>
          <MainButton title="Refresh" onPress={refetch} />
        </View>
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
  noCartsFound: {
    fontSize: TEXT_LARGE,
    color: 'gray',
    textAlign: 'center',
  },
});
