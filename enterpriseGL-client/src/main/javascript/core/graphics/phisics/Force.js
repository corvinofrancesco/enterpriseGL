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
        for(var ri in p.relations){
            var r = p.relations[ri],
                d = particles[r],
                l = 0;// r.modelReference[1]??
            // vector D - P
            var dp = d.position.clone().subSelf(p.position);
            l = dp.length();
            if(l==0) continue;
            if(l<delta - 0.5) dp.negate();
            else if(l<delta + 0.5) continue;
            dp.multiplyScalar(k);
            p.accelerations.addSelf(dp)
        }
        log(p.modelReference + " -> " + p.accelerations.length() 
//                + ", " +
//                p.accelerations.y + ", " +
//                p.accelerations.z 
                
            , 'LOG'+p.modelReference, true);
    };
    return f;
}

function gravitation(g){
    var f = new Force();
    f.type = Force.types.LOCAL;
    f.force = function(p) {
        var dp = p.position.clone().normalize();
        dp.multiplyScalar(-g);
        p.accelerations.addSelf(dp)
    }
    return f;
}

function attrito(c){
    var f = new Force();
    f.type = Force.types.LOCAL;
    f.force = function(p) {
        var s = p.accelerations.clone().multiplyScalar(c);
        p.accelerations.subSelf(s);
    };
    return f;
}