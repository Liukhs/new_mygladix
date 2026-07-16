export function seedSummary(){
    const sections = document.querySelectorAll('.section-anchor');
    const summary = document.querySelector('.ul-summary');
    if(summary){
        console.log('Diocane');
    }
    sections.forEach(section =>{
        summary.innerHTML += `<li><a href="#${section.id}">${prepareSummaryName(section.id)}</a></li>`;
    })
}

function prepareSummaryName(name){
    return name.split("-").map(parola => parola.charAt(0).toUpperCase() + parola.slice(1).toLowerCase()).join(" ");
}