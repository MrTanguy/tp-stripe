const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const CLI_PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.listen(CLI_PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${CLI_PORT}`);
});



const stripe = require('stripe')('sk_test_51O7wGPG26lduJPDnNnwyk2OndIupH9O8S30Owc1EZS0nm6N5EcJWidGgcs4I58j2SryjP4KSh2AWxjjvVVbTW9dt00IxVuzuj2');

app.post('/create-checkout-session', async (req, res) => {
    // Créez une session de paiement avec Stripe Checkout
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price: 'price_1O7yAPG26lduJPDnKmFBCDO8', // Remplacez par l'ID de votre prix
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/fail',
        payment_intent_data: {
          capture_method: "manual",
          setup_future_usage: "off_session",
        }
    });

    res.json({ sessionId: session.id });
});


app.get('/dashboard', async (req, res) => {
    // Récupérez les informations sur le compte Stripe (solde)
    const account = await stripe.accounts.retrieve();

    // Récupérez la liste des paiements
    const payments = await stripe.paymentIntents.list();

    res.render('dashboard', { account, payments });
});

app.get('/get-stripe-balance', (req, res) => {

    stripe.balance.retrieve()
        .then(balance => {
            res.json(balance);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération du solde Stripe', error);
            res.status(500).json({ error: 'Erreur lors de la récupération du solde Stripe' });
        });
});

app.get('/list-stripe-payments', (req, res) => {

    stripe.paymentIntents.list()
        .then(payments => {
            res.json(payments);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des paiements Stripe', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des paiements Stripe' });
        });
});