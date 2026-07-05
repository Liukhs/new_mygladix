const bigCards = document.querySelectorAll('.big-card-protego');
const colCards = document.querySelectorAll('.small-card-protego');
let firstCard = null;
let secondCard = null;
let thirdCard = null;
let fourthCard = null;
let invisibleCard = null;

export function protegoCarousel(){
    let activeCard = null;

    colCards.forEach(card => {
        
        card.addEventListener('click', () => {
            cercaCards();
            activeCard = Array.from(bigCards).find(carde => carde.classList.contains('active'));
            initCardAnimations();
            activeCard.classList.add('active-to-column');
            

            setTimeout(() =>{ 
                bigCards.forEach(bCard =>{
                    if(bCard.dataset.card === card.dataset.card){
                        invisibleCard.classList.remove('invisible');
                        invisibleCard.classList.add('fourth');
                        activeCard.classList.remove('active');
                        bCard.classList.add('active');
                        card.classList.remove('first');
                        card.classList.add('invisible');
                        secondCard.classList.remove('second')
                        secondCard.classList.add('first');
                        thirdCard.classList.remove('third');
                        thirdCard.classList.add('second');
                        fourthCard.classList.remove('fourth');
                        fourthCard.classList.add('third');
                        card.classList.remove('first-animation-column');
                        secondCard.classList.remove('second-animation-column');
                        thirdCard.classList.remove('third-animation-column');
                        fourthCard.classList.remove('fourth-animation-column');
                        activeCard.classList.remove('active-to-column');

                        resetData();
                    }
                })
            }, 500);
        })
    })
}

function cercaCards(){
    firstCard = Array.from(colCards).find(carde => carde.dataset.posizione === 'first');
    secondCard = Array.from(colCards).find(carde => carde.dataset.posizione === 'second');
    thirdCard = Array.from(colCards).find(carde => carde.dataset.posizione === 'third');
    fourthCard = Array.from(colCards).find(carde => carde.dataset.posizione === 'fourth');
    invisibleCard = Array.from(colCards).find(carde => carde.dataset.posizione === 'invisible');
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
