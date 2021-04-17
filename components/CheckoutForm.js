import React,{useState} from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { destroyCookie } from "nookies";

const CheckoutForm = ({ paymentIntent }) => {

const [checkoutError, setCheckoutError] = useState();
const [checkoutSuccess, setCheckoutSuccess] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const {
        error,
        paymentIntent: { status }
      } = await stripe.confirmCardPayment(paymentIntent.client_secret, { 
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
  
      if (error) throw new Error(error.message);
  
      if (status === "succeeded") {
        setCheckoutSuccess(true);
        destroyCookie(null, "paymentIntentId");
      }
    } catch (err) {
      alert(err.message);
      setCheckoutError(err.message);
    }
  }
  
  if (checkoutSuccess) return <p>Payment successful!</p>;
  return (
    <>
    <form onSubmit={handleSubmit}>
    <CardElement
  options={{
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }}
/>
      <button type="submit" disabled={!stripe}>
      Pay now
    </button>
    {checkoutError && <span style={{ color: "red" }}>{checkoutError}</span>}
    </form>
    </>
  );
}

export default CheckoutForm