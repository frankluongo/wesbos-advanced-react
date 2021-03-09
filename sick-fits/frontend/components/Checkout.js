import { useMutation } from '@apollo/client';
import { CREATE_ORDER_MUTATION, CURRENT_USER_QUERY } from '@lib/queries';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { useCartContext } from '@context';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  display: grid;
  gap: 1rem;
  padding: 1rem;

  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [checkout, { error: gqlError }] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const router = useRouter();
  const { setOpen } = useCartContext();

  function errorHandler(err) {
    setErr(err);
    nProgress.done();
  }

  async function handleSubmit(e) {
    // 1. Stop Form Submission
    e.preventDefault();
    // 2. Turn Loader on
    setLoading(true);
    // 3. Start Page Transition
    nProgress.start();
    // 4. Create Stripe Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    // 5a. Handle Any Stripe Errors
    if (error) return errorHandler(error);
    // 5b. Send Token to Keystone Server via custom mutation
    try {
      const order = await checkout({
        variables: {
          token: paymentMethod?.id,
        },
      });
      if (gqlError) return errorHandler(gqlError);
      // 6. Close Cart
      setOpen(false);
      // 7. Turn Loader Off
      setLoading(false);
      nProgress.done();
      // 8. Change Page to View Order
      router.push({
        pathname: '/order',
        query: { id: order?.data?.checkout?.id },
      });
    } catch (err) {
      errorHandler(err);
    }
    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {err && <p>{err.message}</p>}
      <CardElement />
      <SickButton disabled={loading} aria-disabled={loading}>
        Checkout Now
      </SickButton>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
