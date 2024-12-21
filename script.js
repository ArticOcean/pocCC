const offersData = [
    { card: 'Chase Freedom', store: 'Staples', percent: 5, endDate: '12/29/2024', online: 'Y', max: 8 },
    { card: 'Chase Freedom', store: 'Event Tickets Center', percent: 10, endDate: '1/28/2025', online: 'N', max: 50 },
    { card: 'Discover', store: 'Amazon', percent: 15, endDate: '3/15/2025', online: 'Y', max: 25 },
    { card: 'Discover', store: 'Walmart', percent: 7, endDate: '4/30/2025', online: 'N', max: 12 }
];

const offersContainer = document.getElementById('offers');
const cardSelect = document.getElementById('cardSelect');

// Populate credit card options dynamically
const uniqueCards = [...new Set(offersData.map(offer => offer.card))];
uniqueCards.forEach(card => {
    const option = document.createElement('option');
    option.value = card;
    option.textContent = card;
    cardSelect.appendChild(option);
});

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
cardSelect.dispatchEvent(new Event('change'));
