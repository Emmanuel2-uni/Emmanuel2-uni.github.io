const test = document.querySelector('.test');
const add_btn = document.querySelector('.add_btn')
const cardquestion = document.querySelector('.card_question')
const cardanswer = document.querySelector('.card_answer')

store_deck_num = parseInt(localStorage.getItem("store_index"));
//store_deck_num += 1;
test.innerHTML = `Test Deck: ${store_deck_num} <br>`
console.log(store_deck_num)

add_btn.addEventListener('click', ()=>{
    add_Card();
})

function show_Deck() {

    // fetched jsons are *asynchronous* code/scope
    // everything must be done inside .then() do we dont have to wait/reject Promise based calls
    fetch("https://webspec-finals-be.onrender.com/api/decks", {mode: "cors"})
    .then(function(response){
        return response.json();
    }).then((deck_json) =>{
        //console.log("ping 1")
        console.log(deck_json)
        console.log(deck_json[store_deck_num])
        //console.log(deck_json[0].card_id)
        deck_json.forEach((element) => {
            if(element.deck_id == store_deck_num){
                str_card_id = String(element.card_id)
                console.log(str_card_id)

                //curr_deck.push(deck_json[store_deck_num])
                
                test.innerHTML += `<br>Card_ID: ${element.card_id}
                <br>Question: ${element.card_question}
                <br>Answer: ${element.card_answer}
                <br>
                <button class="delete_btn" onClick="delete_Card('${str_card_id}')">Delete</button>`
                // console.log("ping 2"), check condition fulfillment
            }  
        })
    }).catch((error) =>{
        console.log(error)
    })
}

function delete_Card(index){
    console.log("Ping Delete")
    index = String(index)
    let card_id = {index};
    console.log(card_id)

    if(confirm(`Do you want to delete Card ID ${index}`)){
        console.log(card_id)
        fetch("https://webspec-finals-be.onrender.com/api/decks", {
            mode: "cors",
            method: 'DELETE',
            body: JSON.stringify({card_id}),
            headers:{
                'Content-Type': 'application/json'
            }

        }).then(response => response.text())
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
}

function add_Card(){
    var card_count = 0;
    if(cardquestion != '' && cardanswer != ''){
        fetch("https://webspec-finals-be.onrender.com/api/decks", {mode: "cors"})
            .then(function(response){
                return response.json();
            }).then((deck_json) =>{
                console.log(deck_json)
                deck_json.forEach((element) => {
                    if(element.deck_id == store_deck_num){
                        card_count++
                    }
                })
                console.log("Card count: " + card_count);
                card_count += 1;

                let deck_id = store_deck_num;
                let deck_name = deck_json[store_deck_num].deck_name;
                let card_id = `${store_deck_num}_${card_count}`
                let card_question = cardquestion.value;
                let card_answer = cardanswer.value;

                let formDeck = {deck_id, deck_name, card_id, card_question, card_answer}
                console.log("Ping 92")
                console.log(formDeck)
                addCard(formDeck)
            })        
    }
    setTimeout(() => window.location.reload(), 2000);
    
}


function addCard(card){
    fetch("https://webspec-finals-be.onrender.com/api/decks", {
        method: 'POST',
        body: JSON.stringify(card),
        headers: {
           'Content-Type': 'application/json'
        }
    }).catch((error) => console.log(error))   
}

// const delete_btn = document.querySelector('.delete_btn')

// delete_btn.addEventListener(`click`, () =>{
//     console.log("Ping delete")
// })
show_Deck();