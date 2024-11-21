// Where to store deck library/ objects
let decks = [];

//Show the deck/s function 
function showDecks() {
    const deckList = document.getElementById('deckList');
    deckList.innerHTML = '';
    decks.forEach((deck, index) => {
        const deckDiv = document.createElement('div');
        deckDiv.classList.add('deck');
        deckDiv.textContent = deck.name;
        deckDiv.onclick = () => openDeck(index); 
        deckList.appendChild(deckDiv);
    });
}

//creates a deck
function showCreateDeck() {
    const name = document.querySelector('.deck-name').value
    if (name != '') {
        decks.push({ name, flashcards: [] });
        alert(`Deck ${name} created`)
        document.body.classList.remove('active-popup');
        document.querySelector('.deck-name').value = ''
        showDecks();
    }else {
        alert(`Please enter a deck name`)
    }
}

// Just to add deck cards to simulate auto scrollbar effect
function addCardSim() {
    const names = ['a','b','c','d','e']
    
    for(let i = 0; i < names.length; i++){
        document.querySelector('.deck-name').value = `deck_${i}`
        const name = document.querySelector('.deck-name').value
        decks.push({name, flashcards: []});
        showDecks();
    }
}

//shows the deck upon opening
// not possible in this case because of static web
showDecks();
