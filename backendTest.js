const content = document.querySelector('#content')
//const submit = document.querySelector('#submit')


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

window.addEventListener("load", () => {
  getUsers();
})


function getUsers(){
  //const rand = Math.random() * 20;
  let html = ""
  //fetch("http://localhost:5002/api/members", {mode: "cors"})
  fetch("https://webspec-finals-be.onrender.com/api/decks", {mode: "cors"})
    .then((response)=>{
      console.log(response)
      return response.json();
    })
    
    //data start
    .then((data) =>{
      
      data.forEach((element)=>{
        //console.log(Math.floor(rand))
        html += `Deck: ${element.deck_id} || ${element.deck_name} 
        <br> Card: ${element.card_id} 
        <br> Question: ${element.card_question} 
        <br> Answer: ${element.card_answer}
        <br></br>`
        // if(element.id == Math.floor(rand)){
        //   html += `<li> ${element.setup} <br>${element.punchline}</li>`
        // }
      })
      content.innerHTML = html
    })
    //data end
    .catch((error) =>{
      console.log(error)
    })
}



// function deleteMembers(id){

//   let formData = {id}
//   if(confirm(`Do you want to delete user id ${id}`)){ 
//   //fetch("http://localhost:5002/api/members", {mode: "cors"})
//   //fetch("https://bscs3b-crud-api-yvd4.onrender.com/api/members", 
//     fetch("http://localhost:3002/api/members", {
//     method: 'DELETE',
//     body: JSON.stringify({formData}),
//     headers:{
//       'Content-Type': 'application/json'
//     }

//   }).then(response => response.text())
//   .then(response => console.log(response))
//   .catch(error => console.log(error))
//   }

// }