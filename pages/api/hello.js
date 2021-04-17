// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const stripe = require('stripe')('sk_test_51Ifj2ESIx03WM52JVP64h9S6mjSJlSGIp2V9SqHGbMUV6JBINUiur7pYZKOZVFUu2f6KoFOjCQsqGBq88h3NI7kv00HRMscnis')


export default (req, res) => {
  if(req.method == POST){
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'localhost:3000/success',
      cancel_url: 'localhost:3000/cancel',
    });
  
    res.json({ id: session.id });
  
  }
}
