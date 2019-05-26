import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Divider,
  Header,
  Dropdown,
  Container,
} from 'semantic-ui-react';
import HotelsList from './HotelsList';

const SelectPaymentMethod = () => {
  const value = '';
  return (
    <Container text>
      <HotelsList hotels={[]} />
      <Header as="h3">Wybierz formę płatności:</Header>
      <Dropdown
        placeholder="forma płatności..."
        onChange={(e, { value }) => noop(value)}
        fluid
        value={value}
        selection
        options={paymentsOptions}
      />
      <Divider hidden />
      <Button
        disabled={!value}
        onClick={() => noop(value)}
        primary
        floated="right"
      >
        Wybierz
      </Button>
      <Button onClick={() => noop()}>Powrót do listy hoteli</Button>
    </Container>
  );
};

const noop = () => {};

export const paymentsOptions = [
  {
    key: 'blik',
    text: 'BLIK',
    value: 'blik',
  },
  {
    key: 'paypal',
    text: 'PayPal',
    value: 'paypal',
  },
  {
    key: 'card',
    text: 'Karta Kredytowa',
    value: 'card',
  },
];
export default SelectPaymentMethod;
