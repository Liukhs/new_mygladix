export function flashCards(){
    const cards = document.querySelectorAll('.card__reversable');
    if(cards === null){
        return;
    }
    cards.forEach(card =>{
        const glare = card.querySelector('.card-glare');
        let isFlipped = false;

        card.addEventListener('mousemove', (e) =>{
            if(isFlipped) return;

            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const rotY = x*25;
            const rotX = -y*25;

            card.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
            card.style.transition = 'none';

            if(glare){
                glare.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,255,255,0.12) 0%, transparent 65%)`;
            }

        });

        card.addEventListener('mouseleave', () =>{
            if(isFlipped) return;
            card.style.transform = 'rotateX(0deg) rotateY(0deg)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.15, 0.85, 0.45, 1)';
        });

        card.addEventListener('click', () =>{
            isFlipped = !isFlipped;
            console.log(`click intercettato ${isFlipped}`)
            if(isFlipped){
                console.log("Siamo dentro isFlipped true")
                card.style.transition = 'transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.2)';
                card.classList.add('is-flipped');
            }else{
                card.style.transition = 'transform 0.5s cubic-bezier(0.15, 0.85, 0.45, 1)';
                card.classList.remove('is-flipped');
            }
        })
    })
}