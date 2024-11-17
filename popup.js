const container = document.querySelector('.container')
const add_deck = document.querySelector('.add-deck')

// Activate pop-up event via button #open-popup and #open-popup2
document.querySelector('#open-popup2').addEventListener('click', () =>{
    document.body.classList.add('active-popup');
    // document.main.classList.add('noClick');
});

document.querySelector('#open-popup').addEventListener('click', () =>{
    document.body.classList.add('active-popup');
    // document.main.classList.add('noClick');
});


// Deactivate pop-up event via button .close-btn and .cancel-deck
document.querySelector('.popup .close-btn').addEventListener('click', () =>{
    document.body.classList.remove('active-popup');
    // container.classList.remove('noClick');
});

document.querySelector('.cancel-deck').addEventListener('click', () =>{
    document.body.classList.remove('active-popup');
    // container.classList.remove('noClick');
});
