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
    f.type = Force.types.LOCAL;
    f.force = function(p) {
        if(!(p.accelerations instanceof THREE.Vector3)) 
            p.accelerations = new THREE.Vector3(0,0,0);
        for(var ri in p.relations){
            var r = p.relations[ri],
                d = particles[r],
                l = 0;// r.modelReference[1]??
            // vector D - P
            var dp = d.position.clone().subSelf(p.position);
            l = dp.length();
            if(l==0) continue;
            if(l<delta - 0.2) dp.negate()
            else if(l<delta + 0.2) continue;
            dp.multiplyScalar(k);
            p.accelerations.addSelf(dp)
            log(l + " -> " + 
                p.accelerations.x + ", " +
                p.accelerations.y + ", " +
                p.accelerations.z 
                
            , 'LOG', true);
        }
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