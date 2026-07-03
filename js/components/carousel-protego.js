const bigCards = document.querySelectorAll('.big-card-protego');
const colCards = document.querySelectorAll('.small-card-protego');

export function protegoCarousel(){
    let activeCard = null;

    colCards.forEach(card => {
        let firstCard = Array.from(colCards).find(carde => carde.classList.contains('first'));
        let secondCard = Array.from(colCards).find(carde => carde.classList.contains('second'));
        let thirdCard = Array.from(colCards).find(carde => carde.classList.contains('third'));
        let fourthCard = Array.from(colCards).find(carde => carde.classList.contains('fourth'));
        let invisibleCard = Array.from(colCards).find(carde => carde.classList.contains('invisible'));
        card.addEventListener('click', () => {
            activeCard = Array.from(bigCards).find(carde => carde.classList.contains('active'));
            card.classList.add('first-animation-column');
            secondCard.classList.add('second-animation-column');
            thirdCard.classList.add('third-animation-column');
            fourthCard.classList.add('fourth-animation-column');
            activeCard.classList.add('active-to-column')

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
                    }
                })
            }, 500);
        })
    })
}

function cercaCards(){
    let firstCard = Array.from(colCards).find(carde => carde.classList.contains('first'));
    let secondCard = Array.from(colCards).find(carde => carde.classList.contains('second'));
    let thirdCard = Array.from(colCards).find(carde => carde.classList.contains('third'));
    let fourthCard = Array.from(colCards).find(carde => carde.classList.contains('fourth'));
    let invisibleCard = Array.from(colCards).find(carde => carde.classList.contains('invisible'));
}