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
    
    randNum: function(min,max){
        var m = min;
        var n = max;
        var r = m + Math.round(Math.random()*n); 
        return(r); 
    },
    
    createRel: function(sys, numRel) {
        rels  = new Array();
        // aggiungere numRel relazioni tra le particelle inserite in sys mettendo a random sorgente e destinazione
        for(j=0; j<numRel; j++){
            idS = randNum(0, numRel);
            idD = randNum(0, numRel);
            // controllo che sorgente e destinazione non siano uguali
            if(idS!=idD){
                // controllo che non esista già una relazione con gli stessi sorgente e destinazione, anche scambiati,
                // usando la funzione isIndexIn di relation.js

                // crea la nuova relazione con idS e idD
                rels[j] = new Relation(idS, idD);
            }
        }
        sys.relations = rels;
    }
}