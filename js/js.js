gsap.registerPlugin(ScrollTrigger);
let stage;
let cardsEl = [];
let TOTAL = 0;
const VISIBLE = 7;
const ARC_RADIUS = 1500;

const BASE_Y = 80; // coordinata y della card centrale dal top dello stage
const CARD_W = 350; // larghezza delle card
const ARC_SPREAD = 60;
let current = 0;
let animating = false;

window.addEventListener("DOMContentLoaded", () => {
  carosello();
  initAnimationSystem();
  //arcoBusinessUnit();

  stage = document.getElementById('stage');
  cardsEl = document.querySelectorAll('.arc--cards');
  TOTAL = cardsEl.length;
  STAGE_W = document.querySelector('.arc--carousel-root').getBoundingClientRect().width;
  const prevBtn = document.getElementById('prevBtn')
  prevBtn.addEventListener('click', ()=> navigate(-1));
  const nextBtn = document.getElementById('nextBtn')
  nextBtn.addEventListener('click', ()=> navigate(1));

  arcCarousel();
  render();
  gscroll("#sezione", "#syfe-title", -150);
  let cards = gsap.utils.toArray("#cardi");
  console.log("card trovate:", cards.length);
  gMultiScroll("#sezione", cards, 200);
});
window.addEventListener("load", () =>{
  menu();
})
window.addEventListener("DOMContentLoaded", () => {
    const loaderTop = document.querySelector(".loader-top");
    const loaderBot = document.querySelector(".loader-bottom");
    //const content = document.querySelector("content");

    setTimeout(() => {
        //content.style.display = "block";
        loaderTop.remove();
        loaderBot.remove();
        gfrom(".hero-motto", 200, 1.5);
        gfrom(".title--hero", -200, 1.5);
    }, 800);
});


//funzione che gestisce il carosello della homepage
function carosello(){
    //raccogliamo la riga del carosello e un array delle slide al suo interno
  const row = document.querySelector(".carousel--row");
  if(!row){
    return;
  }

  let slide = Array.from(row.querySelectorAll(".sct"));
  let currentIndex = 0
  //cloniamo la prima slide e la incolliamo infondo all'array
  const firstClone = slide[0].cloneNode(true);
  row.appendChild(firstClone);
  //aggiorniamo l'array delle slide aggiungendo la slide appena clonata
  slide = Array.from(row.querySelectorAll(".sct"));
  //impostiamo dinamicamente la larghezza della riga in modo che si adatti sempre alle nostre slide totali
  row.style.width = ((slide.length) * 100) + "vw";
  const scritte = slide[0].querySelectorAll('.animation--left-in');
  doAnimation(scritte);
  //intervallo di 3 secondi per slide
  setInterval(()=>{
    //impostiamo l'index e ricaviamo l'offset
    currentIndex = (currentIndex+1)%slide.length;
    const offset = currentIndex * 100;
    //diamo la transition alla dopo che è stata tolta per il clone
    row.style.transition = 'transform 0.6s ease-in';
    slide.forEach(s =>{
      if(currentIndex === Number(s.dataset.index)){
        const titolo = s.querySelectorAll('.title');
        const subtitle = s.querySelectorAll('.subtitle');
        const button = s.querySelector('.btn');
        addAnimation(titolo)
        addAnimation(subtitle);
        button.classList.add(`animation--${button.dataset.animation}-in`);
      }
    })
    //effettuiamo l'effettivo spostamento della riga
    row.style.transform = `translateX(-${offset}vw)`;
    setTimeout(()=>{
      addAnimation(scritte);
    }, 600);
    const currentSlide = slide[currentIndex == 0 || currentIndex == slide.length-1 ? null : currentIndex];
    if(currentSlide != null){
      const toAnimate = currentSlide.querySelectorAll('.animation');
      doAnimation(toAnimate);
    }
    //se l'index combacia con l'ultima slide del carosello
    if(currentIndex === slide.length-1){
        //timeout lungo quanto la transizione
        setTimeout(()=>{
            //togliamo transizione così non si vede che torniamo all'inizio del carosello
            row.style.transition = 'none';
            //impostiamo l'index a 0
            currentIndex = 0;
            //riportiamo la riga al punto di partenza
            row.style.transform = 'translateX(0px)';
            const scritte = slide[currentIndex].querySelectorAll(`.animation--left-in`);   
                     
        }, 600);
        doAnimation(scritte);
    }
  }, 5000)
}


//Funzione che gestisce le animazioni delle scritte del carosello della prima pagina
function doAnimation(lista){
  lista.forEach(item =>{
    setTimeout(()=>{
      item.classList.remove(`animation--${item.dataset.animation}-in`);
    }, Number(item.dataset.timing))
  })
}
//funzione che gestisce l'animazione di ogni elemento della pagina
function diAnimation(el) {
    if (el.classList.contains('anim-done')) return;

    const timing = Number(el.dataset.timing) || 0;

    setTimeout(() => {
        el.classList.add(`animation--${el.dataset.animation}`);
        el.classList.add('anim-done');
        
        // Notifica globale: fondamentale per sbloccare chi è già nel viewport
        window.dispatchEvent(new CustomEvent('step-completed'));
    }, timing);
}
function checkAndRun(el) {
    if (el.classList.contains('anim-done')) return;

    const prevId = el.dataset.after;

    if (!prevId) {
        // Nessun vincolo: parte subito
        diAnimation(el);
    } else {
        const prevEl = document.querySelector(prevId);
        // Parte solo se il "padre" esiste e ha già finito
        if (prevEl && prevEl.classList.contains('anim-done')) {
            diAnimation(el);
        }
        // Se il padre non ha finito, non facciamo nulla. 
        // Sarà l'evento 'step-completed' a far ripartire il controllo.
    }
}
function initAnimationSystem() {
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1
    };

    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Quando l'elemento entra nel viewport, proviamo a farlo partire
                checkAndRun(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    // Seleziona tutti gli elementi da animare
    const elements = document.querySelectorAll('.animation');
    elements.forEach(el => observer.observe(el));
    //check sugli elementi precedenti
    window.addEventListener('step-completed', () => {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - rect.height //&& rect.bottom > 0;
            
            if (isVisible) {
                checkAndRun(el);
            }
        });
    });
}

function addAnimation(lista){
  lista.forEach(item =>{
    item.classList.add(`animation--${item.dataset.animation}-in`);
  })
}

function menu(){
  const menu = document.querySelector('.header');
  //const headerHeight = document.querySelector('.header-height');
  const dropdown = document.querySelector('.dropdown');
  //let altezzaMenu = headerHeight?.getBoundingClientRect().height || 0;
  //headerHeight.style.height = `${altezzaMenu}px`;
  //console.log(altezzaMenu);

  let altezza = menu.querySelector('.sct.sct--row').offsetHeight;
  console.log(altezza);
  window.addEventListener('scroll', ()=>{
    if(scrollY == 0){
      //menu.style.transform = 'translateY(0px)';
      menu.classList.add('header--pre-scroll');
      menu.classList.remove('header--post-scroll');
    }else{
      //menu.style.transform = `translateY(-${altezza}px)`;
      //dropdown.style.transform = `translateY(${altezza}px)`;
      menu.classList.add('header--post-scroll');
      menu.classList.remove('header--pre-scroll');
      
    }
  })
}


function arcCarousel(){
    cardsEl.forEach((el, i) =>{
      el.addEventListener('click', () =>{
        if(animating) return;
        const rel = getRelativePos(i);
        if(rel === 0) return;
        navigate(rel > 0 ? 1 : -1);
      })
    });


}

function getRelativePos(idx){
  let rel = idx - current;
  if(rel > TOTAL / 2) rel -= TOTAL;
  if(rel < -TOTAL / 2) rel += TOTAL;
  return rel;
}

function getSlotConfig(relPos){
  const half = Math.floor(VISIBLE / 2);

  if(Math.abs(relPos) > half) return null;
  //angolo in gradi, da -ARC_SPREAD A +ARC_SPREAD
  const angleDeg = (relPos / half) * ARC_SPREAD;
  const angleRad = (angleDeg * Math.PI) / 180;
  /*
    Posizione X: partendo dal centro dello stage,
    ci spostiamo lateralmente lungo l'arco.
    Sottraiamo metà larghezza card per centrarla sul punto
  */
  const x = STAGE_W / 2 + ARC_RADIUS * Math.sin(angleRad) - CARD_W / 2;
  /*
    Posizione Y: la card centrale è a BASE_Y.
    Le card laterali salgono lungo l'arco.
    formula: spostamento verticale = R RxCOS(Angolo) = Rx(1-cos(angolo))
  */
 const y = BASE_Y + ARC_RADIUS * (1 - Math.cos(angleRad));

 const scale = 1 - Math.abs(relPos) * 0.09;
 const opacity = 1 - Math.abs(relPos) * 0.17;
 const zIndex = 9 - Math.abs(relPos);

 const rotate = angleDeg * 0.30;
 return {x, y, scale, opacity, zIndex, rotate};
}

function render(){
  cardsEl.forEach((el, i) =>{
    const rel = getRelativePos(i);
    const cfg = getSlotConfig(rel);

    if(!cfg){
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '0';
      el.classList.remove('active');
      return;
    }
    el.style.left = cfg.x + 'px';
    el.style.top = cfg.y + 'px';
    el.style.transform = `scale(${cfg.scale}) rotate(${cfg.rotate}deg)`;
    el.style.opacity   = cfg.opacity;
    el.style.zIndex    = cfg.zIndex;
    el.style.pointerEvents = 'auto';
    el.classList.toggle('active', rel === 0);
  });
}

function navigate(dir){
  if(animating) return;

  animating = true;

  current = (current + dir + TOTAL)%TOTAL;
  render();
  setTimeout(() => {
    animating = false;
  }, 650);
}

function gfrom(elemento, x, durata){
  gsap.from(elemento, {
    x: x,
    duration: durata,
    ease: "power2.out",
    opacity: 0,
    delay: 0.2,
  })
}
function gscroll(trigger, elemento, x){
  gsap.from(elemento,{
    scrollTrigger: {
      trigger: trigger,
      start: "top center",
      end: "bottom center",
      
    },
    x: x,
    opacity: 0,
    ease: "power3.out",
  });
}
function gMultiScroll(trigger, elemento, x){
  gsap.from(elemento,{
    scrollTrigger: {
      trigger: trigger,
      start: "top center",
      end: "bottom center",
      markers: true,
    },
    x: x,
    ease: "power3.out",
    stagger: 0.2,
    opacity: 0,
    
  });
}


/*document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });*/