// Where to store deck library/ objects
let decks = [];
var deck_list = [];
var store_deck_num;
// original, frontend static code
// Show the deck/s function 
// function showDecks() {
//     const deckList = document.getElementById('deckList');
//     deckList.innerHTML = '';
//     decks.forEach((deck, index) => {
//         const deckDiv = document.createElement('div');
//         deckDiv.classList.add('deck');
//         deckDiv.textContent = deck.name;
//         deckDiv.onclick = () => openDeck(index); 
//         deckList.appendChild(deckDiv);
//     });
// }


function store_index(index){
    store_deck_num = index;
    console.log(store_deck_num + 'ping')
}

//  modification of the showDecks()
//  NOTE: Put EVERYTHING inside the .then() functions to prevent async code fuckery
//    ALSO NOTE: Learn async code fuckery
function try_getDecks() {

    // fetched jsons are *asynchronous* code/scope
    // everything must be done inside .then() do we dont have to wait/reject Promise based calls
    fetch("https://webspec-finals-be.onrender.com/api/decks", {mode: "cors"})
    .then(function(response){
        return response.json();
    }).then((deck_json) =>{
        console.log("ping 1")
        console.log(deck_json)
        var temp_num = 0; // for storing numbers
        var deck_num_id = []; // for proper indexing
        var deck_num_name = [];
        deck_json.forEach((element) => {
            if(temp_num != element.deck_id){
                // console.log("ping 2"), check condition fulfillment
                temp_num = element.deck_id
                deck_num_id.push(element.deck_id)
                deck_num_name.push(element.deck_name)
            }  
        })

        // Checks if passed through
        console.log(deck_num_id)
        console.log(deck_num_name)
        decks = deck_num_name;

        // Original display code made by Marc, modified
        const deckList = document.getElementById('deckList');
        deckList.innerHTML = '';

        decks.forEach((deck, index) => {
            console.log("Ping 2")
            const deckDiv = document.createElement('div');
            deckDiv.classList.add('deck');
            deckDiv.textContent = deck;
            deckDiv.onclick = () => {
                console.log(index);
                openDeck(index);
                } 
            deckList.appendChild(deckDiv);
        });

    }).catch((error) =>{
        console.log(error)
    })
    // const deckList = document.getElementById('deckList');
    // deckList.innerHTML = '';
    // decks.forEach((deck, index) => {
    //     const deckDiv = document.createElement('div');
    //     deckDiv.classList.add('deck');
    //     deckDiv.textContent = deck.name;
    //     deckDiv.onclick = () => openDeck(index); 
    //     deckList.appendChild(deckDiv);
    // });

}




//creates a deck
function showCreateDeck() {
    let deck_name = document.querySelector('.deck-name').value
    let card_question = document.querySelector('.card-name').value
    let card_answer = document.querySelector('.card-answer').value
    
    fetch("https://webspec-finals-be.onrender.com/api/decks", {mode: "cors"})
    .then(function(response){
        return response.json();
    }).then((deck_json) =>{
        console.log("ping 3-show")
        console.log(deck_json)
        console.log(deck_name)

        // Below code will check the most recent card id
        var temp_num = 0; // for storing numbers
        var deck_num_id = []; // for proper indexing
        var deck_num_name = [];
        deck_json.forEach((element) => {
            if(temp_num != element.deck_id){
                // console.log("ping 4-show"), check condition fulfillment
                temp_num = element.deck_id
                deck_num_id.push(element.deck_id)
                deck_num_name.push(element.deck_name)
            }  
            //temp_num -= 1 // safety indexing
        })
        temp_num += 1; // to add
        console.log(temp_num);

        let deck_id = temp_num
        let card_id = `${deck_id}_1`

        let form_Deck = {deck_id, deck_name, card_id, card_question, card_answer}
        console.log(form_Deck)
        add_Deck(form_Deck)
    }).catch((error) => console.log(error))


    // // Original code by Marc
    // if (deck_name != '' && card_name != '' && card_answer != '')  {
    //     decks.push({ deck_name, flashcards: [] });
    //     alert(`Deck ${deck_name} created`)
    //     document.body.classList.remove('active-popup');
    //     document.querySelector('.deck-name').value = ''
    //     showDecks();
    // }else {
    //     alert(`Please enter all details.`)
    // }
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


// function for adding decks
function add_Deck(deck){
    console.log(deck)
    fetch("https://webspec-finals-be.onrender.com/api/decks", {
        method: 'POST',
        body: JSON.stringify(deck),
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch((error) => console.log(error))   
}

// function for deleting decks
function delete_Deck(deck){
    console.log(deck)
    fetch("https://webspec-finals-be.onrender.com/api/decks", {
        method: 'DELETE',
        body: JSON.stringify({deck}),
        headers:{
            'Content-Type': 'application/json'
        }
    }).catch((error) => console.log(error))
}

function openDeck(index){
    store_deck_num = index
    console.log(store_deck_num)
    localStorage.setItem("store_index", store_deck_num)
    console.log("Ping " + localStorage.getItem("store_index"))
}

// run
try_getDecks();
