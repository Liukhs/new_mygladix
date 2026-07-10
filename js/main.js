import { initArcCarousel } from "./components/carousel-arc.js";
import { initHomeAnimations } from "./animations/home-animations.js";
import { protegoCarousel } from "./components/carousel-protego.js";
import { carousel900 } from "./components/carousel-protego-900.js";
import { flashCards } from "./components/flash-cards.js";

const isMobile = window.matchMedia('(max-width: 900px)'); //Metodo per controllare la larghezza dello schermo in JS

function handleLayoutChange(e){
    if(e.matches){
        carousel900();
    }else{
        protegoCarousel();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    initArcCarousel();
    initHomeAnimations();
    flashCards();
    handleLayoutChange(isMobile);

    isMobile.addEventListener('change', handleLayoutChange);
});
