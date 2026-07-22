const threshold = window.innerHeight * 0.6;

export function menu(){
  const menu = document.querySelector('.header');
  const hamburger = document.querySelector('.menu-hamburger');
  const dropdown = document.querySelector('.dropdown');

  

  window.addEventListener('scroll', ()=>{
    if(scrollY == 0){
      menu.classList.add('header--pre-scroll');
      menu.classList.remove('header--post-scroll');
      hamburger.classList.add('menu-hamburger__out');
    }else if(scrollY > threshold){
      menu.classList.add('header--post-scroll');
      menu.classList.remove('header--pre-scroll');
      hamburger.classList.remove('menu-hamburger__out');
    }
  })
}