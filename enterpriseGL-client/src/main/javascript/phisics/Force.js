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
//        var distx, disty, distz;
//        // calcolare con Math.abs()
//        if(sPart.x>dPart.x)
//            distx = sPart.x - dPart.x;
//        else distx = dPart.x - sPart.x;
//        log(distx, 'Distx', true);
//        if(sPart.y>dPart.y)
//            disty = sPart.y - dPart.y;
//        else disty = dPart.y - sPart.y;
//        log(disty, 'Disty', true);
//        if(sPart.z>dPart.z)
//            distz = sPart.z - dPart.z;
//        else distz = dPart.z - sPart.z;
//        log(distz, 'Distz', true);
//        
//        if(1 - distx > 0.01) {
//                sPart.accelerations.x -= distx*k;
//                dPart.accelerations.x += distx*k;
//                sPart.velocity.x += sPart.accelerations.x * 0.001;
//                sPart.x += sPart.velocity.x * 0.001;                
//                dPart.velocity.x += dPart.accelerations.x * 0.001;
//                dPart.x += dPart.velocity.x * 0.001;                
//                distx = dPart.x - sPart.x;
//        } else if (distx - 1 > 0.01) {
//                sPart.accelerations.x += distx*k;
//                dPart.accelerations.x -= distx*k;
//                sPart.velocity.x += sPart.accelerations.x * 0.001;
//                sPart.x += sPart.velocity.x * 0.001;                
//                dPart.velocity.x += dPart.accelerations.x * 0.001;
//                dPart.x += dPart.velocity.x * 0.001;                
//                distx = dPart.x - sPart.x;                
//        } else {
//            sPart.velocity.x = 0;
//            sPart.accelerations.x = 0;
//            dPart.velocity.x = 0;
//            dPart.accelerations.x = 0;
//        }

        var distance = sPart.distance(dPart);
        for(var axis in sPart.accelerations){
            var dir = sPart[axis] - dPart[axis];
            if (distance == 0) distance = 0.01;
            if(distance > delta + 0.01 || distance < delta - 0.01){
                var vers = dir / distance; 
                var acc = vers * Math.abs(dir) * k;
                sPart.accelerations[axis] -= acc ;
                dPart.accelerations[axis] += acc;                
            } else {
                sPart.velocity.x = 0;
                sPart.accelerations.x = 0;
                dPart.velocity.x = 0;
                dPart.accelerations.x = 0;
            }
        }    
        log(sPart.distance(dPart), 'Distance', true);
    };
    return f;
}

function attrito(c){
    var f = new Force();
    f.type = Force.types.LOCAL;
    f.force = function(p) {
        for(var axis in p.accelerations){
            p.accelerations[axis] -= c * p.accelerations[axis];
//            if(p.accelerations[axis]>0){
//                p.accelerations[axis] -= c;
//            } else if (p.accelerations[axis]<0){
//                p.accelerations[axis] += c;
//            }
        }    
    };
    return f;
}