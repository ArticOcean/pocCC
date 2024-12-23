const offersData = [
    { card: 'Chase Freedom', store: 'Staples', percent: 5, endDate: '12/29/2024', online: 'Y', max: 8 },
    { card: 'Chase Freedom', store: 'Event Tickets Center', percent: 10, endDate: '1/28/2025', online: 'N', max: 50 },
    { card: 'Discover', store: 'Amazon', percent: 15, endDate: '3/15/2025', online: 'Y', max: 25 },
    { card: 'Discover', store: 'Walmart', percent: 7, endDate: '4/30/2025', online: 'N', max: 12 }
];

const offersContainer = document.getElementById('offers');
const cardSelect = document.getElementById('cardSelect');
const storeSelect = document.createElement('select');
const percentSelect = document.createElement('select');

// Insert filters into the DOM
document.querySelector('.container').insertBefore(storeSelect, offersContainer);
document.querySelector('.container').insertBefore(percentSelect, offersContainer);

storeSelect.id = 'storeSelect';
percentSelect.id = 'percentSelect';

storeSelect.innerHTML = '<option value="all">All</option>';
percentSelect.innerHTML = '<option value="all">All</option>';

function populateCardOptions() {
    cardSelect.innerHTML = '<option value="all">All</option>';
    const uniqueCards = [...new Set(offersData.map(offer => offer.card))];
    uniqueCards.forEach(card => {
        const option = document.createElement('option');
        option.value = card;
        option.textContent = card;
        cardSelect.appendChild(option);
    });
}

function updateDependentFilters() {
    const selectedCard = cardSelect.value;
    
    const filteredOffers = selectedCard === 'all' 
        ? offersData 
        : offersData.filter(offer => offer.card === selectedCard);
    
    // Update Store Filter
    const uniqueStores = [...new Set(filteredOffers.map(offer => offer.store))];
    storeSelect.innerHTML = '<option value="all">All</option>';
    uniqueStores.forEach(store => {
        const option = document.createElement('option');
        option.value = store;
        option.textContent = store;
        storeSelect.appendChild(option);
    });

    // Update Percent Filter
    const uniquePercents = [...new Set(filteredOffers.map(offer => offer.percent))];
    percentSelect.innerHTML = '<option value="all">All</option>';
    uniquePercents.sort((a, b) => a - b).forEach(percent => {
        const option = document.createElement('option');
        option.value = percent;
        option.textContent = `${percent}%`;
        percentSelect.appendChild(option);
    });
}

function displayOffers() {
    const cardFilter = cardSelect.value;
    const storeFilter = storeSelect.value;
    const percentFilter = percentSelect.value;
    
    offersContainer.innerHTML = '';
    const filteredOffers = offersData.filter(offer => 
        (cardFilter === 'all' || offer.card === cardFilter) &&
        (storeFilter === 'all' || offer.store === storeFilter) &&
        (percentFilter === 'all' || offer.percent == percentFilter)
    );
    
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

cardSelect.addEventListener('change', () => {
    updateDependentFilters();
    displayOffers();
});
storeSelect.addEventListener('change', displayOffers);
percentSelect.addEventListener('change', displayOffers);

// Initial Load
populateCardOptions();
updateDependentFilters();
displayOffers();
