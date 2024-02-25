import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import RatingBar, {RatingBarGroup} from './RatingBar';
import {TEXT_LARGE} from './sizing';
import {FlatList} from 'react-native-gesture-handler';

export type Product = {
  img: string;
  name: string;
  nutriScore: number;
  sustainabilityScore: number;
};

type ProductInformationProps = {product: Product};
type ShortProductInformationProps = {product: Product; onSelected?: () => void};
type ShortProductInformationListProps = {
  products: Product[];
  onSelected?: (product: Product) => void;
};

export function ShortProductInformationList({
  products,
  onSelected,
}: ShortProductInformationListProps) {
  return (
    <FlatList
      contentContainerStyle={styles.shortProductInformationList}
      style={styles.shortProductInformationListContainer}
      renderItem={({item: product}) => (
        <ShortProductInformation
          product={product}
          onSelected={onSelected ? () => onSelected(product) : undefined}
        />
      )}
      data={products}
    />
  );
}

export function ShortProductInformation({
  product,
  onSelected,
}: ShortProductInformationProps) {
  return (
    <TouchableOpacity
      style={styles.shortProductInformation}
      onPress={onSelected}>
      <Image src={product.img} style={styles.shortProductInformationImage} />
      <Text style={styles.shortProductInformationText}>{product.name}</Text>
    </TouchableOpacity>
  );
}

export default function ProductInformation({product}: ProductInformationProps) {
  return (
    <View style={styles.productInformation}>
      <Image src={product.img} style={styles.productImage} />
      <Text style={styles.productNameText}>{product.name}</Text>
      <RatingBarGroup>
        <RatingBar
          label="Nutri Score"
          min={0}
          max={10}
          actual={product.nutriScore}
        />
        <RatingBar
          label="Sustainability Score"
          min={0}
          max={10}
          actual={product.sustainabilityScore}
        />
      </RatingBarGroup>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  productNameText: {
    fontSize: TEXT_LARGE,
    fontWeight: 'bold',
  },
  shortProductInformationList: {
    width: '90%',
    alignSelf: 'center',
  },
  shortProductInformationListContainer: {
    width: '100%',
  },
  shortProductInformation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    margin: 5,
    borderColor: 'lightgray',
    borderWidth: 2,
    width: '100%',
    alignSelf: 'center',
  },
  shortProductInformationImage: {
    width: 50,
    height: 50,
  },
  shortProductInformationText: {
    fontSize: TEXT_LARGE,
  },
});
