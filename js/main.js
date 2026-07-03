import { initArcCarousel } from "./components/carousel-arc.js";
import { initHomeAnimations } from "./animations/home-animations.js";
import { protegoCarousel } from "./components/carousel-protego.js";

window.addEventListener('DOMContentLoaded', () => {
    initArcCarousel();
    initHomeAnimations();
    protegoCarousel();
});
