const offersData = [
    { card: 'Chase Freedom', store: 'Staples', percent: 5, endDate: '12/29/2024', online: 'Y', max: 8 },
    { card: 'Chase Freedom', store: 'Event Tickets Center', percent: 10, endDate: '1/28/2025', online: 'N', max: 50 }
];

const offersContainer = document.getElementById('offers');
const cardSelect = document.getElementById('cardSelect');

function displayOffers(filter) {
    offersContainer.innerHTML = '';
    const filteredOffers = offersData.filter(offer => filter === 'all' || offer.card === filter);
    
    filteredOffers.forEach(offer => {
        const offerCard = document.createElement('div');
        offerCard.classList.add('offer-card');
        offerCard.innerHTML = `
            <h3>${offer.store}</h3>
            <p><strong>${offer.percent}% Off</strong></p>
            <p>Expires: ${offer.endDate}</p>
            <p>Online Only: ${offer.online === 'Y' ? 'Yes' : 'No'}</p>
            <p>Max Discount: $${offer.max}</p>
        `;
        offersContainer.appendChild(offerCard);
    });
}

cardSelect.addEventListener('change', (e) => {
    displayOffers(e.target.value);
});

// Initial Load
displayOffers('all');
