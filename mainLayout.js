// Where to store deck library/ objects
let decks = [];
var deck_list = [];

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
    let card_name = document.querySelector('.card-name').value
    let card_answer = document.querySelector('.card-answer').value
    let deck_id = 0
    let card_id = 0
    let form_Deck = {deck_id, card_id, deck_name, card_name, card_answer}

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
        })
        console.log(temp_num);
        temp_num += 1;
        
    }).then({
        method: 'POST',
        body: JSON.stringify(form_Deck),
        headers:{
            'Content-Type': 'application/json'
        }
    }).catch((error) => console.log(error))


    // Original code by Marc
    if (deck_name != '' && card_name != '' && card_answer != '')  {
        decks.push({ deck_name, flashcards: [] });
        alert(`Deck ${deck_name} created`)
        document.body.classList.remove('active-popup');
        document.querySelector('.deck-name').value = ''
        showDecks();
    }else {
        alert(`Please enter all details.`)
    }


    // submit.addEventListener('click', () => {
    //   let fname = document.querySelector('#fname').value
    //   let lname = document.querySelector('#lname').value 
    //   let email = document.querySelector('#email').value
    //   let gender = document.querySelector('#gender').value
    
    //   //object
    //   //{'fname,: fname, 'lname: dela cruz'}
    //   let formData = {fname, lname, email, gender}

    //   //console.log(formData)
    //   //fetch("https://bscs3b-crud-api-yvd4.onrender.com/api/members", {
    
    //   fetch('http://localhost:3002/api/members', {

    //     method: 'POST',
    //     body: JSON.stringify(formData),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }
    //   }).catch((error) => console.log(error))
    //   alert("Successfully inserted!");  
    //   location.reload();
    // //end
    // })

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
try_getDecks();
