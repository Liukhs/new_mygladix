export function importaMenu(){
    const placeholder = document.getElementById("header-placeholder");

    if(placeholder){
        fetch("/Header.html")
            .then(response =>{
                if(!response.ok){
                    throw new Error("Errore nel caricamento dell'header");
                }
                return response.text();
            })
            .then(data =>{
                placeholder.outerHTML = data;

                const event = new CustomEvent("HeaderLoaded");
                window.dispatchEvent(event);
            })
            .catch(error => console.error("Problema con il fetch: ", error));
    }
}