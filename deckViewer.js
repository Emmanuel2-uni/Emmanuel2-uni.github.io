const test = document.querySelector('.test')
store_deck_num = localStorage.getItem("store_index")
test.innerHTML = store_deck_num
console.log(store_deck_num)

// function show_Deck() {

//     // fetched jsons are *asynchronous* code/scope
//     // everything must be done inside .then() do we dont have to wait/reject Promise based calls
//     fetch("https://webspec-finals-be.onrender.com/api/decks", {mode: "cors"})
//     .then(function(response){
//         return response.json();
//     }).then((deck_json) =>{
//         console.log("ping 1")
//         console.log(deck_json)
//         var temp_num = 0; // for storing numbers
//         var deck_num_id = []; // for proper indexing
//         var deck_num_name = [];
//         deck_json.forEach((element) => {
//             if(temp_num != element.deck_id){
//                 // console.log("ping 2"), check condition fulfillment
//                 temp_num = element.deck_id
//                 deck_num_id.push(element.deck_id)
//                 deck_num_name.push(element.deck_name)
//             }  
//         })

//         // Checks if passed through
//         console.log(deck_num_id)
//         console.log(deck_num_name)
//         decks = deck_num_name;

//         // Original display code made by Marc, modified
//         const deckList = document.getElementById('deckList');
//         deckList.innerHTML = '';
//         decks.forEach((deck, index) => {
//             console.log("Ping 2")
//             const deckDiv = document.createElement('div');
//             deckDiv.classList.add('deck');
//             deckDiv.textContent = deck;
//             deckDiv.onclick = () => {
//                 console.log(index);
//                 openDeck(index);
//                 } 
//             deckList.appendChild(deckDiv);
//         });


//     }).catch((error) =>{
//         console.log(error)
//     })
// }
