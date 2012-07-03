function FixedParticles(){
    // this. eccetera per settare le proprietà del costruttore
}

FixedParticles.prototype = {

    /**
     *  start particles system
     */
    popolate: function(sys) {
        sys.add((new Particle(0)),null);
        sys.add((new Particle(1)).move(2,0,0),null);
        sys.add((new Particle(2)).move(0,2,0),null);
        sys.add((new Particle(3)).move(0,0,2),null);
        sys.add((new Particle(4)).move(0,0,4),null);
        sys.add((new Particle(5)).move(2,2,0),null);
        sys.relations = [
            new Relation(0,1),
            new Relation(0,2),
            new Relation(0,3),
            new Relation(3,4),
            new Relation(2,5)
        ];           
    }
}