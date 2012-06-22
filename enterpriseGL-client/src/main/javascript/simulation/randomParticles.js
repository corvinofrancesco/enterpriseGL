function SimulSystem(){
    // this. eccetera per settare le proprietà del costruttore
}

SimulSystem.prototype = {
    
    // creazione di numPart nel sistema sys
    createPart: function(sys, numPart) {
        parts = new Array();
        // aggiunge all'array creato un numero di particelle pari a numPart
        for(i=0; i<numPart; i++){
            parts[i] = new Particle(i).move(this.randNum(-1,1)+0.1,this.randNum(-1,1)+0.1,this.randNum(-1,1)+0.1);
            parts[i].accelerations = {
                x : this.randNum(-10,10)+0.1,
                y : this.randNum(-10,10)+0.1,
                z : this.randNum(-10,10)+0.1
            };
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
        // aggiunge numRel relazioni tra le particelle inserite in sys mettendo a random sorgente e destinazione
        var tentativi = 0;
        for(j=0; j<numRel; ){
            idS = this.randNum(0, numRel);
            idD = this.randNum(0, numRel);
            // controllo che sorgente e destinazione non siano uguali
            if(idS!=idD){
                var exist = false;
                // controllo che non esista già una relazione tra le stessa particelle
                rels.forEach(function(relation){
                    if(relation.areIndexIn(idS.idD)) exist = true;
                });
                if(!exist) {
                    // crea la nuova relazione con idS e idD e incrementa j
                    rels[j] = new Relation(idS, idD);
                    j++;
                    tentativi = 0;
                } else {
                    tentativi ++;
                    if(tentativi>20) break;
                }
            }
        }
        sys.relations = rels;
    }
}