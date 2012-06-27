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

function attractionForce(particles, k){
    var f = new Force();
    f.type = Force.types.ONRELATIONS;
    f.force = function(r) {
        var sPart = particles[r.idS];//this.particles[r.idS];
        var dPart = particles[r.idD];//this.particles[r.idD];
        for(var axis in sPart.accelerations){
            var dir = k * (sPart[axis] - dPart[axis]);
            sPart.accelerations[axis] -= dir;
            dPart.accelerations[axis] += dir;
        }
    };
    return f;
}
