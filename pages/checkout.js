import Stripe from "stripe";
import { parseCookies, setCookie } from "nookies";
import CheckoutForm from "../components/CheckoutForm";
import {Button} from '@chakra-ui/react';

const CheckoutPage = (props) => {

      console.log(JSON.stringify(props, null, 2));

    return(
      <>
        <CheckoutForm paymentIntent={props.paymentIntent} />
      </>
  );

}

  export const getServerSideProps = async (ctx) => {
    const stripe = new Stripe('sk_test_51Ifj2ESIx03WM52JVP64h9S6mjSJlSGIp2V9SqHGbMUV6JBINUiur7pYZKOZVFUu2f6KoFOjCQsqGBq88h3NI7kv00HRMscnis');
  
    let paymentIntent;

    const { paymentIntentId } = await parseCookies(ctx);
  
    if (paymentIntentId) {
      paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  
      return {
        props: {
          paymentIntent
        }
      };
    }
  
    paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "inr"
    });
  
    setCookie(ctx, "paymentIntentId", paymentIntent.id);
  
    return {
      props: {
        paymentIntent
      }
    };
  };

  export default CheckoutPage;