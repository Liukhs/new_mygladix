export function loader(){
    const isFirstTime = sessionStorage.getItem('isFirstTime');
    const loader = document.querySelector('.loader-contenitore');
    if(!loader) return;
    if(!isFirstTime){
        disableScroll();
        setTimeout(() =>{
            loader.classList.add("none");
            enableScroll();
            sessionStorage.setItem('isFirstTime', 'true');
        }, 3000)
    }else{
        enableScroll();
        loader.classList.add("none");
    }
}

function disableScroll(){
    document.body.style.overflow = "hidden";
}
function enableScroll(){
    document.body.style.overflow = "";
}