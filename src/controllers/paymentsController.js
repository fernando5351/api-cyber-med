const Stripe = require("stripe");
const stripe = Stripe(process.env.stripe_api_key);

// async function payments(req, res) {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: "{{PRICE_ID}}",
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// }

async function pay(req, res) {
  const { total, email, id } = req.body;
  console.log(req.body);

  let charge = Math.round( 100 * total )
  console.log(charge);

  const customer = await stripe.customers.create ({ email })
  // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token

  const paymentIntent = await stripe.paymentIntents.create({
    amount: charge,
    currency: 'usd',
    payment_method_types: ['card'],
  }).then( data => console.log(data))

  res.send({ message: "ok"})
}

// console.log(process.env.paypal_client_secret);
// var paypal = require('paypal-rest-sdk');

// async function payments ( req, res ) {
//   var create_payment_json = {
//     "intent": "sale",
//     "payer": {
//         "payment_method": "paypal"
//     },
//     "redirect_urls": {
//         "return_url": "http://return.url",
//         "cancel_url": "http://cancel.url"
//     },
//     "transactions": [{
//         "item_list": {
//             "items": [{
//                 "name": "item",
//                 "sku": "item",
//                 "price": "1.00",
//                 "currency": "USD",
//                 "quantity": 1
//             }]
//         },
//         "amount": {
//             "currency": "USD",
//             "total": "1.00"
//         },
//         "description": "This is the payment description."
//     }]
// };

// paypal.payment.create(create_payment_json, function (error, payment) {
//     if (error) {
//         throw error;
//     } else {
//         console.log("Create Payment Response");
//         console.log(payment);
//         res.redirect(payment.links[0].href)
//     }
// });
// }

module.exports = {
  pay,
};
