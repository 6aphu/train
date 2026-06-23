fetch("http://localhost:3000/api/subscriptions")
    .then(response => response.json())
    .then(data => {

        const container = document.getElementById("subscriptions-container");

        data.forEach(subscription => {

            const card = document.createElement("div");

            card.innerHTML = `
                <h3>${subscription.name}</h3>
                <p>Цена: ${subscription.price} ₸</p>
            `;

            container.appendChild(card);
        });

    })
    .catch(error => {
        console.error(error);
    });