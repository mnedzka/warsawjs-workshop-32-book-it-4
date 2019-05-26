import React, { useReducer } from 'react';
import { Segment } from 'semantic-ui-react';
import SelectHotel from './SelectHotel';

import SelectPaymentMethod from './SelectPaymentMethod';
import ConfirmBooking from './ConfirmBooking';
import BookingCompletionStatus from './BookingCompletionStatus';

const initialState = { step: 1, hotel: null, paymentMethod: null }

function reducer(state, action) {
  switch (action.type) {
    case 'hotel':
      const { hotel } = action.payload;
      return { ...state, step: 2, hotel }
    case 'payment':
      const { method } = action.payload;
      return { ...state, step: 3, paymentMethod: method }
    default:
      return state;
  }
}

const BookingFlow = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const selecthotel = hotel => dispatch({ type: 'hotel', payload: { hotel } })
  const selectPaymentMethod = method => dispatch({ type: 'payment', payload: { method } })

  return (
    <>
      <Section>
        <BookingCompletionStatus step={state.step} />
      </Section>
      <Section>
        {state.step === 1 && <SelectHotel selectHotel={selecthotel} />}
        {state.step === 2 && <SelectPaymentMethod hotel={state.hotel} selectPaymentMethod={selectPaymentMethod} />}
        {state.step === 3 && <ConfirmBooking hotel={state.hotel} paymentMethod={state.payment} />}
      </Section>
    </>
  );
};

const Section = ({ children }) => {
  return (
    <Segment vertical style={{ padding: '2em 0em' }}>
      {children}
    </Segment>
  );
};

export default BookingFlow;
