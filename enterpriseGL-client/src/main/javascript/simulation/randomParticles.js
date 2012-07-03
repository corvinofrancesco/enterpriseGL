function SimulSystem(){
    // this. eccetera per settare le proprietà del costruttore
}

SimulSystem.prototype = {
    
    // creazione di numPart nel sistema sys
    createPart: function(sys, numPart) {
        // aggiunge all'array creato un numero di particelle pari a numPart
        for(i=0; i<numPart; i++){
            var part = new Particle(i).move(
                this.randNum(-1,1)+0.1,
                this.randNum(-1,1)+0.1,
                this.randNum(-1,1)+0.1);
            part.accelerations = {
                x : this.randNum(-10,10)+0.1,
                y : this.randNum(1,10)+0.1,
                z : this.randNum(1,10)+0.1
            };
            sys.add(part,null);
        }
    },
    
    randNum: function(min,max){
        return min + Math.random()*max; 
    },
    
    createRel: function(sys, numRel) {
        rels  = new Array();
        // aggiunge numRel relazioni tra le particelle inserite in sys mettendo a random sorgente e destinazione
        var tentativi = 0;
        for(j=0; j<numRel; ){
            idS = Math.round(this.randNum(0, numRel-1));
            idD = Math.round(this.randNum(0, numRel-1));
            // controllo che sorgente e destinazione non siano uguali
            if(idS!=idD){
                var exist = false;
                // controllo che non esista già una relazione tra le stessa particelle
                rels.forEach(function(relation){
                    if(relation.areIndexIn(idS,idD)) exist = true;
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
    },
    
    /**
     *  start particles system
     */
    popolate: function(sys) {
//        this.createPart(sys, 5);
//        this.createRel(sys, 5); 
        var pA = new Particle(0).move(3,1,0); 
        var pB = new Particle(1).move(-3,2,0);
        var r = new Relation(0,1);
        sys.add(pA, r);
        sys.add(pB, r);
//        var pC = new Particle(2).move(-4,0,0); 
//        var pD = new Particle(3).move(4,0,0);
//        var r1 = new Relation(2,3);
//        sys.add(pC, r1);
//        sys.add(pD, r1);
    }
}