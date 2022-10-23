const stripe = require("stripe")(process.env.stripe_api_key);
console.log(process.env.stripe_api_key);
const { factory } = require("../factory/quey_factory");

// async function payment (req, res){
//     try {
//         // const customer = stripe.customer.create({
//         //     email: req.body.stripeEmail,
//         //     source: req.body.stripeToken
//         // })
//         // const charge = await stripe.charges.create({
//         //     amount: {monto},
//         //     currency: 'usd',
//         //     customer: customer.id,
//         //     description: {description}
//         // })
//         // console.log(charge.id);
//         // res.send("received")

//         const { email, total, user, id } = req.body

//         if (!email) { return res.status(400).json({ message: "porfavor ingrese un correo" }) }
//         const paymentIntent = await stripe.paymentIntents.create({
//           amount: {total},
//           currency: 'usd',
//           payment_method_types: ['card'],
//         })
//         const clientSecret = paymentIntent.client_secret;
//         res.json({ message: "Pago iniciado", clientSecret})
//         let query = `ALTER TABLE datos_pedido SET estado=0 WHERE id_usuario=${id}`
//         query = await factory(query)
//         console.log(query);

//     } catch (err) {
//         console.log(`hay un error en: ${err}`);
//         res.status(500).json({ message: "internal server error" })
//     }
// }

async function payment(req, res) {
  try {
    const { email, total, id } = req.body;
    if (!email) return res.status(400).json({ message: "Please enter a email" });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: {total},
      currency: "USD",
      payment_method_types: ["card"],
      metadata: { email },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: "Payment initiated", clientSecret });
    let query = `ALTER TABLE datos_pedido SET estado=0 WHERE id_usuario=${id}`;
    query = await factory(query);
    console.log(query);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function stripePay(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }

  // Event when a payment is initiated
  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.name} initated payment!`);
  }
  // Event when a payment is succeeded
  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.name} succeeded payment!`);
    // fulfilment
  }
  res.json({ ok: true });
}

// async function session () {
//     const session = await stripe.checkout.sessions.create({
//         line_items: [
//           {
//             // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//             price: '{{PRICE_ID}}',
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         success_url: `${YOUR_DOMAIN}?success=true`,
//         cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//       });

//       res.redirect(303, session.url);
// }

module.exports = {
  payment,
  stripePay,
};
