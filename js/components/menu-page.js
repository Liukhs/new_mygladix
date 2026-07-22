
export function gestisciMenu(){
    const menu = document.querySelector('.menu-page');
    const summaryButton = document.querySelector('.right-wing');
    const summaryUl = document.querySelector('.ul-summary');
    const summary = document.querySelector('.page-summary');
    const buttonMenu = document.querySelector('.menu-hamburger__placeholder'); //placeholder per i confini del bottone che attiva il menu
    const button = document.querySelector('.menu-hamburger');
    const pScritta = document.querySelector('.item');
    const pX = document.querySelector('.item-nero');
    const headerButton = document.querySelector('.header__button');
    const body = document.body;

    if (!menu || !summaryButton || !summaryUl || !summary || !buttonMenu || !button || !pScritta || !pX || !headerButton) {
        console.error('gestisciMenu: elementi menu mancanti nel DOM', {
            menu,
            summaryButton,
            summaryUl,
            summary,
            buttonMenu,
            button,
            pScritta,
            pX,
            headerButton,
        });
        return;
    }

    buttonMenu.addEventListener('click', ()=>{
        if(!menu.classList.contains('active')){
            menu.classList.add('active');
            button.classList.add('active');
            pScritta.classList.add('p-su');
            pX.classList.remove('p-giu');
            body.classList.add('no-scroll');
        }else{
            menu.classList.remove('active');
            button.classList.remove('active');
            pScritta.classList.remove('p-su');
            pX.classList.add('p-giu');
            body.classList.remove('no-scroll');
        }
    })
    summaryButton.addEventListener('click', () =>{
        console.log("menu cliccato!");
        if(summary.classList.contains('active')){
            summary.classList.remove('active');
            summaryUl.classList.remove('active');
        }else{
            summary.classList.add('active');
            summaryUl.classList.add('active');
        }
    })
    headerButton.addEventListener('click', () =>{
        if(!menu.classList.contains('active')){
            menu.classList.add('active');
            button.classList.add('active');
            pScritta.classList.add('p-su');
            pX.classList.remove('p-giu');
            body.classList.add('no-scroll');
        }else{
            menu.classList.remove('active');
            button.classList.remove('active');
            pScritta.classList.remove('p-su');
            pX.classList.add('p-giu');
            body.classList.remove('no-scroll');
        }
    })
}
/*
Tutti i classList.add/remove andrebbero messi insieme in una funzione esterna e poi richiamati ma è lo stesso, si farà

*/