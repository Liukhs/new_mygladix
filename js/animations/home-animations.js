import {gfrom, gscroll, gMultiScroll, multiScrollPage, gTlAnim} from './GSAP-animations.js';

let cards = gsap.utils.toArray("#cardi");
let titles = gsap.utils.toArray(".anim-class");
let hero = gsap.utils.toArray(".hero-string");
let sezioni = gsap.utils.toArray("#sezione");


export function initHomeAnimations(){

    console.log(sezioni.length)

    gTlAnim(sezioni);
    
    
    //gMultiScroll("#sezione", titles, -150);
    //gMultiScroll("#sezione", cards, 200);
    setTimeout(()=>{
        gfrom(hero, 200, 1.5);
    }, 800);

    // inizializza gli hover delle news (spostato da main.js)
    initNewsHover();
    newsAvatar();
}

export function initNewsHover(){
    const news = gsap.utils.toArray('.news--card');

    function hoverAnim(elemento){
        gsap.to(elemento, {
            y: -10,
            duration: 0.3,
            borderColor: "rgba(255, 0, 123, 0.4)",
            boxShadow: "0 20px 40px rgba(255, 0, 123, 0.1)",
            ease: "power2.out",
        })
    }
    function dishoverAnim(elemento){
        gsap.to(elemento, {
            y: 0,
            duration: 0.3,
            borderColor:"rgba(255,255,255, 0.02)",
            boxShadow: "0",
            ease: "power2.out",
        })
    }

    news.forEach(element => {
        element.addEventListener('mouseenter', () =>{
            hoverAnim(element);
        })
        element.addEventListener('mouseleave', () =>{
            dishoverAnim(element);
        })
    });
}
