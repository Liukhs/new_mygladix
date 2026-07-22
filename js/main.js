import { initArcCarousel } from "./components/carousel-arc.js";
import { initHomeAnimations } from "./animations/home-animations.js";
import { protegoCarousel } from "./components/carousel-protego.js";
import { carousel900 } from "./components/carousel-protego-900.js";
import { flashCards } from "./components/flash-cards.js";
import { gestisciMenu } from "./components/menu-page.js";
import { menu } from "./components/menu-scroll.js"
import { importaMenu } from "./components/menu-fetch.js";
import { loader } from "./components/loader-animation.js";
import { seedSummary } from "./components/summary-seed.js";
import { fullBlog } from "./components/blog.js";

const isMobile = window.matchMedia('(max-width: 900px)'); //Metodo per controllare la larghezza dello schermo in JS


function handleLayoutChange(e){
    if(e.matches){
        carousel900();
    }else{
        protegoCarousel();
    }
}

importaMenu();

window.addEventListener("HeaderLoaded", () =>{
    gestisciMenu();
    menu();
    seedSummary();
})

window.addEventListener('DOMContentLoaded', () => {
    loader();
    initArcCarousel();
    initHomeAnimations();
    flashCards();
    handleLayoutChange(isMobile);
    fullBlog();
    

    isMobile.addEventListener('change', handleLayoutChange);
    
});

