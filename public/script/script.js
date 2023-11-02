const form = document.getElementById('locationForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    const last_name = document.getElementById('nom').value;
    const first_name = document.getElementById('prenom').value;
    const age = parseInt(document.getElementById('age').value);
    const city = document.getElementById('ville').value;
    const vehicule = document.getElementById('vehicule').value;
    const token = document.getElementById('token').value;

    // Crée un objet JSON avec les données du formulaire
    const data = {
        last_name: last_name,
        first_name: first_name,
        age: age,
        city: city,
        vehicule: vehicule,
    };

    // Convertit l'objet JSON en chaîne JSON
    const jsonData = JSON.stringify(data);

    // Crée une requête XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Définissez la méthode HTTP et l'URL de la requête
    xhr.open('POST', 'http://localhost:3000/create-checkout-session', true);

    // Définissez le type de contenu de la requête
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Réagissez à l'événement de chargement de la réponse
    xhr.onload = function() {
        if (xhr.status === 200) {
            // La demande a réussi
            console.log('Session de paiement créée avec succès.');

            // Récupérez l'ID de session renvoyé par le serveur
            var response = JSON.parse(xhr.responseText);
            var sessionId = response.sessionId;
            var stripe = Stripe('pk_test_51O7wGPG26lduJPDnG398Esw4QdG9FdkhAl24SJnCzTw2CUl3zmq4czV8EXehvNYyaAMIOVgJIpN2YcPiXghmBJhZ00u2iXw0BA');

            // Lancez Stripe Checkout avec l'ID de session
            stripe.redirectToCheckout({
                sessionId: sessionId,
            });
        } else {
            // La demande a échoué
            console.error('Erreur lors de la création de la session de paiement.');
        }
    };

    // Envoyez la requête avec les données JSON
    xhr.send(jsonData);
});
