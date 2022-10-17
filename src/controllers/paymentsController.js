const stripe = require('stripe')(process.env.stripe_api_key);
const YOUR_DOMAIN = 'http://localhost:4242';

async function payment (req, res){
    try {
        // const customer = stripe.customer.create({
        //     email: req.body.stripeEmail,
        //     source: req.body.stripeToken
        // })
        // const charge = await stripe.charges.create({
        //     amount: {monto},
        //     currency: 'usd',
        //     customer: customer.id,
        //     description: {description}
        // })
        // console.log(charge.id);
        // res.send("received")

        const { email, total } = req.body

        if (!email) { return res.status(400).json({ message: "porfavor ingrese un correo" }) }
        const paymentIntent = await stripe.paymentIntents.create({
          amount: {total},
          currency: 'usd',
          payment_method_types: ['card'],
          metadata: {name},
        })
        const clientSecret = paymentIntent.client_secret;
        res.json({ message: "Pago iniciado", clientSecret})

    } catch (err) {
        console.log(`hay un error en: ${err}`);
        res.status(500).json({ message: "internal server error" })
    }
}

async function session () {
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: '{{PRICE_ID}}',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      });
    
      res.redirect(303, session.url);
}

module.exports = {
    payment
}
