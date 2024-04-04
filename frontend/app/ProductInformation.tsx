/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {RatingBarGroup} from './RatingBar';
import {TEXT_LARGE, TEXT_MEDIUM, TEXT_SMALL} from './sizing';
import {FlatList} from 'react-native-gesture-handler';
import FoodInfo from './types/FoodInfo';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from './Card';
import ProgressBar from './shared/ProgressBar';
import {DARK_GRAY, BLACK} from './colors';

type ShortProductInformationProps = {
  product: FoodInfo;
  onSelected?: () => void;
  onDeleted?: () => void;
};
type ShortProductInformationListProps = {
  products: FoodInfo[];
  onSelected?: (product: FoodInfo) => void;
  onDeleted?: (product: FoodInfo) => void;
};

export function ShortProductInformationList({
  products,
  onSelected,
  onDeleted,
}: ShortProductInformationListProps) {
  if (products.length === 0) {
    return (
      <View style={styles.productNotFound}>
        <Text style={styles.productNotFoundText}>No products found</Text>
      </View>
    );
  } else {
    return (
      <FlatList
        contentContainerStyle={styles.shortProductInformationList}
        style={styles.shortProductInformationListContainer}
        renderItem={({item: product}) => (
          <ShortProductInformation
            product={product}
            onSelected={onSelected ? () => onSelected(product) : undefined}
            onDeleted={onDeleted ? () => onDeleted(product) : undefined}
          />
        )}
        data={products}
      />
    );
  }
}

export function ShortProductInformation({
  product,
  onSelected,
  onDeleted,
}: ShortProductInformationProps) {
  return (
    <TouchableOpacity
      style={styles.shortProductInformation}
      onPress={onSelected}>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '60%'}}>
        <Image
          src={product.image}
          style={styles.shortProductInformationImage}
        />
        <Text style={styles.shortProductInformationText}>
          {product.product_name}
        </Text>
      </View>
      {onDeleted !== undefined ? (
        <TouchableOpacity onPress={onDeleted}>
          <Icon name="trash-outline" size={40} color="black" />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
}

export function ProductInformation({product}: {product: FoodInfo}) {
  return (
    <Card>
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
        <View style={styles.scoreLabel}>
          <Icon name="restaurant" size={23} style={styles.icon} />
          <Text style={styles.scoreLabelText}>
            Nutritional Score: {product.nutri_score}/5
          </Text>
        </View>
        <ProgressBar current={product.nutri_score} total={5} />
        <View style={styles.scoreLabel}>
          <Icon name="leaf" size={23} style={styles.icon} />
          <Text style={styles.scoreLabelText}>
            Sustainability Score: {product.sustainability}/5
          </Text>
        </View>
        <ProgressBar current={product.sustainability} total={5} />
      </RatingBarGroup>
    </Card>
  );
}

const styles = StyleSheet.create({
  productImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productNameText: {
    textAlign: 'center',
    fontSize: TEXT_LARGE,
    fontWeight: 'bold',
    color: 'black',
  },
  shortProductInformationList: {
    width: '90%',
    alignSelf: 'center',
    gap: 5,
  },
  shortProductInformationListContainer: {
    width: '100%',
  },
  shortProductInformation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: 'lightgray',
    borderWidth: 2,
    width: '100%',
    height: 80,
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 8,
  },
  shortProductInformationImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  scoreLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: DARK_GRAY,
  },
  scoreLabelText: {
    fontSize: TEXT_SMALL,
  },
  shortProductInformationText: {
    fontSize: TEXT_MEDIUM,
    marginLeft: 10,
    fontWeight: 'bold',
    color: BLACK,
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
  closeButtonContainer: {
    width: '100%',
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
