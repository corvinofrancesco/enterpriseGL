function SimulSystem(){
    // this. eccetera per settare le proprietà del costruttore
}

SimulSystem.prototype = {
    
    // creazione di numPart nel sistema sys
    createPart: function(sys, numPart) {
        parts = new Array();
        // aggiunge all'array creato un numero di particelle pari a numPart
        for(i=0; i<numPart; i++){
            parts[i] = new Particle(i);
        }
        // aggiunge le particelle al sistema passato
        sys.particles = parts;
    },
    
    createRel: function(sys, numRel) {
        // aggiungere numRel relazioni tra le particelle inserite in sys mettendo a random sorgente e destinazione
        
        // controllo che sorgente e destinazione non siano uguali
        
        // controllo che non esista già una relazione con gli stessi sorgente e destinazione, anche scambiati,
        // usando la funzione isIndexIn di relation.js
    }
}