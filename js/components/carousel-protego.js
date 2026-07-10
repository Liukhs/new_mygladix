const bigCards = document.querySelectorAll('.big-card-protego');
const colCards = document.querySelectorAll('.small-card-protego');
let firstCard = null;
let secondCard = null;
let thirdCard = null;
let fourthCard = null;
let invisibleCard = null;
let activeCard = null;
let cardArray = [];
const aspettaAnimazione = () => new Promise(resolve => setTimeout(resolve, 500));

export function protegoCarousel(){

    colCards.forEach(card => {
        card.addEventListener('click', () => {
            controlCardNumber(cardNumber(card));
        })
    })
}

function cercaCards(){
    cardArray.length = 0;
    firstCard = Array.from(colCards).find(carde => carde.dataset.posizione === 'first');
    secondCard = Array.from(colCards).find(carde => carde.dataset.posizione === 'second');
    thirdCard = Array.from(colCards).find(carde => carde.dataset.posizione === 'third');
    fourthCard = Array.from(colCards).find(carde => carde.dataset.posizione === 'fourth');
    invisibleCard = Array.from(colCards).find(carde => carde.dataset.posizione === 'invisible');
    cardArray.push(firstCard, secondCard, thirdCard, fourthCard, invisibleCard);
    cardArray.forEach(card =>{
        console.log(card.dataset.card +" - "+ card.dataset.posizione);
    })
}


function resetData(){
    colCards.forEach(card => {
        switch(card.dataset.posizione){
            case 'first':
                card.dataset.posizione = 'invisible';
                break;
            case 'second':
                card.dataset.posizione = 'first';
                break;
            case 'third':
                card.dataset.posizione = 'second';
                break;
            case 'fourth':
                card.dataset.posizione = 'third';
                break;
            case 'invisible':
                card.dataset.posizione = 'fourth';
                break;
        }   
    })

}
function cardNumber(card){
    switch(card.dataset.posizione){
        case 'first':
            return 1;
            break;
        case 'second':
            return 2;
            break;
        case 'third':
            return 3;
            break;
        case 'fourth':
            return 4;
            break;
    }

}
function initCardAnimations(){
    colCards.forEach(card => {
        switch(card.dataset.posizione){
            case 'first':
                card.classList.add('first-animation-column');
                break;
            case 'second':
                card.classList.add('second-animation-column');
                break;
            case 'third':
                card.classList.add('third-animation-column');
                break;
            case 'fourth':
                card.classList.add('fourth-animation-column');
                break;
        }  
    })
}
async function controlCardNumber(posizione){
    for(let i = 0; i < posizione; i++){
        cercaCards();
        activeCard = Array.from(bigCards).find(carde => carde.classList.contains('active'));
        initCardAnimations();
        if (activeCard) {
            activeCard.classList.add('active-to-column');
        }

        await aspettaAnimazione();

        if (!cardArray[0]) continue;
        

         
        bigCards.forEach(bCard =>{
            if(bCard.dataset.card === cardArray[0].dataset.card){
                invisibleCard.classList.remove('invisible');
                invisibleCard.classList.add('fourth');
                
                if (activeCard) activeCard.classList.remove('active');
                bCard.classList.add('active');
                
                cardArray[0].classList.remove('first');
                cardArray[0].classList.add('invisible');
                
                if (secondCard) {
                    secondCard.classList.remove('second');
                    secondCard.classList.add('first');
                }
                if (thirdCard) {
                    thirdCard.classList.remove('third');
                    thirdCard.classList.add('second');
                }
                if (fourthCard) {
                    fourthCard.classList.remove('fourth');
                    fourthCard.classList.add('third');
                }
                
                // Rimuovi le classi di animazione per resettare lo stato visivo
                firstCard.classList.remove('first-animation-column');
                secondCard.classList.remove('second-animation-column');
                thirdCard.classList.remove('third-animation-column');
                fourthCard.classList.remove('fourth-animation-column');
                if (activeCard) activeCard.classList.remove('active-to-column');

                // Aggiorna i dataset.posizione per il prossimo scatto
                resetData();
            }
        })
        

    }

}   
