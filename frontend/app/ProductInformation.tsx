import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import RatingBar, {RatingBarGroup} from './RatingBar';
import {TEXT_LARGE} from './sizing';

export type Product = {
  img: string;
  name: string;
  nutriScore: number;
  sustainabilityScore: number;
};

type ProductInformationProps = {product: Product};

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
});
