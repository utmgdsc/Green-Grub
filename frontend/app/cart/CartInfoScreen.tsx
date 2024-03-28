import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View} from 'react-native';
import {ShortProductInformationList} from '../ProductInformation';
import {CartStackParamList} from './CartTab';
import {useGetCartQuery} from './api';
import Section from '../Section';

type CartInfoScreenProps = StackScreenProps<CartStackParamList, 'Cart Details'>;

export default function CartInfoScreen({
  route: {
    params: {cartId},
  },
}: CartInfoScreenProps) {
  const {data: cart} = useGetCartQuery(cartId);
  return (
    <View style={{padding: 20, flex: 1, backgroundColor: 'white'}}>
      <Section title="Products">
        <ShortProductInformationList products={cart?.items ?? []} />
      </Section>
    </View>
  );
}
