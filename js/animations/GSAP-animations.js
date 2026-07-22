export function gfrom(elemento, x, durata){
  gsap.from(elemento, {
    x: x,
    duration: durata,
    ease: "power2.out",
    opacity: 0,
    stagger:0.5,
    delay: 3
  })
}

export function gscroll(trigger, elemento, x){
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

export function gMultiScroll(trigger, elemento, x){
  gsap.from(elemento,{
    scrollTrigger: {
      trigger: trigger,
      start: "-100px center",
      markers: true,
    },
    x: x,
    ease: "power3.out",
    stagger: 0.2,
    opacity: 0,
    
  });
}
export function multiScrollPage(trigger, elemento, x, stagger){
  gsap.from(elemento,{
    scrollTrigger: {
      trigger: trigger,
      start: "-100px center",
      end: "center center",
      markers: true,
    },
    x: x,
    ease: "power3.out",
    stagger: stagger,
    opacity: 0,
    
  });
}
export function gTlAnim(array){
  array.forEach((sezione) =>{
    const elementiAnimabili = sezione.querySelectorAll(`${sezione.dataset.names}`);
    removeTransition(elementiAnimabili);

    gsap.from(elementiAnimabili, {
      scrollTrigger: {
        trigger: sezione,
        start: "top center",
        end: "bottom top",
        markers: true,
        toggleActions: "play reset play reset"
      },
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      x:(index, target) =>{
        return target.dataset.anim === "x" ? (Number(target.dataset.val) || 0) : 0;
      },
      y:(index, target) =>{
        return target.dataset.anim === "y" ? (Number(target.dataset.val) || 0) : 0;
      }
    })
  })
}

function removeTransition(array){
  array.forEach(el =>{
    el.style.transition = "none";
  })
}