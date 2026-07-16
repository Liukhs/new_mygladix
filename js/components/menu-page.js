
export function gestisciMenu(){
    const menu = document.querySelector('.menu-page');
    const summaryButton = document.querySelector('.right-wing');
    const summaryUl = document.querySelector('.ul-summary');
    const summary = document.querySelector('.page-summary');
    const buttonMenu = document.querySelector('.menu-hamburger__placeholder');
    const button = document.querySelector('.menu-hamburger');
    const closeMenu = document.querySelector('.close-x');
    const pScritta = document.querySelector('.item');
    const pX = document.querySelector('.item-nero');
    const headerButton = document.querySelector('.header__button');

    buttonMenu.addEventListener('click', ()=>{
        if(!menu.classList.contains('active')){
            menu.classList.add('active');
            button.classList.add('active');
            pScritta.classList.add('p-su');
            pX.classList.remove('p-giu');
        }else{
            menu.classList.remove('active');
            button.classList.remove('active');
            pScritta.classList.remove('p-su');
            pX.classList.add('p-giu');
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
        }else{
            menu.classList.remove('active');
            button.classList.remove('active');
            pScritta.classList.remove('p-su');
            pX.classList.add('p-giu');
        }
    })
}