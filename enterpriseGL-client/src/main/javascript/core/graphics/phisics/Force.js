/**
 * This file specific the class force 
 * and its properties and extensions
 */
function Force() {
    // default selector: select all elements
    this.selector = function(){return true;}
    // default force: make nothing
    this.force = function(){ };
    this.type = Force.types.LOCAL;
}

Force.types = {
    GLOBAL: "global",
    LOCAL: "local",
    ONRELATIONS: "onRelations"    
};

/**
 * @param particles array di particelle 
 * @param k costante di elasticità
 * @param delta lunghezza minima
 */
function attractionForce(particles, k, delta){
    var f = new Force();
    f.type = Force.types.ONRELATIONS;
    f.force = function(r) {
        var sPart = particles[r.idS];//this.particles[r.idS];
        var dPart = particles[r.idD];//this.particles[r.idD];
        for(var axis in sPart.accelerations){
            var dir = k * (sPart[axis] - dPart[axis]);
            if(dir*dir > delta*delta) {
                sPart.accelerations[axis] -= dir;
                dPart.accelerations[axis] += dir;
            }
        }        
    };
    return f;
}
