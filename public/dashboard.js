document.addEventListener('DOMContentLoaded', function () {
    // Remplacez par votre clé d'API secrète Stripe
    const apiKey = 'sk_test_51O7wGPG26lduJPDnNnwyk2OndIupH9O8S30Owc1EZS0nm6N5EcJWidGgcs4I58j2SryjP4KSh2AWxjjvVVbTW9dt00IxVuzuj2';

    // Fonction pour récupérer le solde du compte Stripe
    const getStripeBalance = async () => {
        try {
            const balance = await fetch('http://localhost:3000/get-stripe-balance', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                },
            });
            const balanceData = await balance.json();
            document.getElementById('balanceAmount').textContent = `$${(balanceData.available[0].amount / 100).toFixed(2)}`;
        } catch (error) {
            console.error('Erreur lors de la récupération du solde Stripe', error);
        }
    };

    // Fonction pour récupérer la liste des paiements Stripe
    const listStripePayments = async () => {
        try {
            const payments = await fetch('http://localhost:3000/list-stripe-payments', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                },
            });
            const paymentsData = await payments.json();
            const paymentList = document.getElementById('paymentList');

            paymentsData.data.forEach(payment => {
                const listItem = document.createElement('li');
                listItem.textContent = `ID Paiement: ${payment.id}, Montant: $${(payment.amount / 100).toFixed(2)}, État: ${payment.status}`;
                paymentList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Erreur lors de la récupération des paiements Stripe', error);
        }
    };

    // Appelez les fonctions pour afficher le solde et la liste des paiements
    getStripeBalance();
    listStripePayments();
});
