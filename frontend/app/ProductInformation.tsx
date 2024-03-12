import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import RatingBar, {RatingBarGroup} from './RatingBar';
import {TEXT_LARGE} from './sizing';
import {FlatList} from 'react-native-gesture-handler';
import FoodInfo from './types/FoodInfo';
import Icon from 'react-native-vector-icons/Ionicons';

type ShortProductInformationProps = {
  product: FoodInfo;
  onSelected?: () => void;
};
type ShortProductInformationListProps = {
  products: FoodInfo[];
  onSelected?: (product: FoodInfo) => void;
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
      <Image src={product.image} style={styles.shortProductInformationImage} />
      <Text style={styles.shortProductInformationText}>
        {product.product_name}
      </Text>
    </TouchableOpacity>
  );
}

export function ProductInformation({product}: {product: FoodInfo}) {
  return (
    <View style={styles.productInformation}>
      {product.image ? (
        <Image src={product.image} style={styles.productImage} />
      ) : (
        <View style={styles.productImage}>
          <Icon name="warning-outline" size={80} color="black" />
          <Text style={styles.productNotFoundText}>Image not available</Text>
        </View>
      )}

      <Text style={styles.productNameText}>{product.product_name}</Text>
      <RatingBarGroup>
        <RatingBar
          label="Nutri Score"
          min={0}
          max={5}
          actual={product.nutri_score}
        />
        <RatingBar
          label="Sustainability Score"
          min={0}
          max={5}
          actual={product.sustainability}
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
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productNameText: {
    fontSize: TEXT_LARGE,
    fontWeight: 'bold',
    color: 'black',
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
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 8,
  },
  shortProductInformationImage: {
    width: 50,
    height: 50,
    flex: 1,
  },
  shortProductInformationText: {
    fontSize: TEXT_LARGE,
    flex: 6,
    color: 'black',
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
