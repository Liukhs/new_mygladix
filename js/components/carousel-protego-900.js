export function carousel900(){
    const buttons = document.querySelectorAll('.buttons-protego');
    const row = document.querySelector('.protego-big-card-wrapper');
    const cards = row.querySelectorAll('.big-card-protego');

    console.log("i bottoni sono: " + buttons.length);
    
    buttons.forEach(button => {
        button.addEventListener('click', () =>{
            if(button.dataset.spostamento === 'left'){
                let activeCard = Array.from(cards).find(card => card.classList.contains('active')) //Come cercare un elemento con una data classe in una collezione
                let activeIndex = +activeCard.dataset.index;
                let nextIndex = +activeCard.dataset.index - 1;
                let distance = nextIndex * 100;
                activateCards(nextIndex);
                console.log("Distanza: "+distance +"\nIndex carta attiva: "+ activeIndex +"\nIndice prossima carta:"+ nextIndex);
                row.style.transform = `translateX(-${distance}vw)`;
            }else if(button.dataset.spostamento === 'right'){
                let activeCard = Array.from(cards).find(card => card.classList.contains('active')) //Come cercare un elemento con una data classe in una collezione
                let activeIndex = +activeCard.dataset.index;
                let nextIndex = +activeCard.dataset.index + 1;
                let distance = nextIndex * 100;
                activateCards(nextIndex);
                console.log("Distanza: "+distance +"\nIndex carta attiva: "+ activeIndex +"\nIndice prossima carta:"+ nextIndex);
                row.style.transform = `translateX(-${distance}vw)`;
            }
        })
    })
}

function activateCards(index){
    const cards = document.querySelectorAll('.big-card-protego');

    cards.forEach(card => {
        card.classList.remove('active');
        
    })
    cards.forEach(card => {
        if(+card.dataset.index === index){
            card.classList.add('active');
        }
    })
    

}