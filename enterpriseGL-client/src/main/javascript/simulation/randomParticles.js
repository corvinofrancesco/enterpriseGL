function SimulSystem(){
    // this. eccetera per settare le propriet� del costruttore
}

SimulSystem.prototype = {
    // funzioni e propriet� come propriet�: function(argomenti) {corpo funzione}
    
    // creazione di numPart nel sistema sys
    createPart: function(sys, numPart) {
        // aggiungere particelle con un for
    },
    
    createRel: function(sys, numRel) {
        // aggiungere numRel relazioni tra le particelle inserite in sys mettendo a random sorgente e destinazione
        
        // controllo che sorgente e destinazione non siano uguali
        
        // controllo che non esista gi� una relazione con gli stessi sorgente e destinazione, anche scambiati,
        // usando la funzione isIndexIn di relation.js
    }
}