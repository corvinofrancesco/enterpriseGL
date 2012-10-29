/**
 * This file specific the class force 
 * and its properties and extensions
 */
EntGL.Force = function(forceFun) {
    // default selector: select all elements
    this.selector = function(){return true;}
    // default force: make nothing
    this.force = forceFun || function(){ };
    this.type = EntGL.Force.types.LOCAL;
    this.params = {};
};

EntGL.Force.types = {
    GLOBAL: "global",
    LOCAL: "local",
    ONRELATIONS: "onRelations"    
};

EntGL.Forces = {
    Random: function(u){
        var f = new EntGL.Force(function(p,system){
            var dp = new THREE.Vector3(
                Math.random() * this.u,
                Math.random() * this.u,
                Math.random() * this.u
            );
            p.accelerations.addSelf(dp);
        });
        f.u = u || 1;
        f.params = {u:[]};
        return f;
    },
    Attraction : function(k,delta){
        var f = new EntGL.Force(function(p,r,system) {
            var d = system.particles[r],
                l = 0, dp;// r.modelReference[1]??
            if(!d) return;
            // vector D - P
            dp = d.position.clone().subSelf(p.position);
            l = dp.length();
            if(l==0) {
                dp.set(Math.random(),Math.random(),Math.random());
            }
            if(l<this.delta - 0.5) dp.negate();
            else if(l<this.delta + 0.5) return;
            dp.multiplyScalar(this.k);
            p.accelerations.addSelf(dp)
        });
        f.type = EntGL.Force.types.ONRELATIONS;
        f.k = k || 1; f.delta = delta || 0.001;
        f.params = {delta:[],k:[]}
        return f;
    },
    
    Gravitational: function(g){
        var f = new EntGL.Force(function(p) {
            var dp = p.position.clone().normalize();
            dp.multiplyScalar(-this.g);
            p.accelerations.addSelf(dp)
        });
        f.type = EntGL.Force.types.LOCAL;
        f.g = g || 10;
        f.params = {g:[]}; 
        return f;
    }

};

/**
 * 
 * @param k costante di elasticità
 * @param delta lunghezza minima
 */
function attractionForce( k, delta){
    var f = new EntGL.Force();
    f.type = EntGL.Force.types.ONRELATIONS;
    f.force = function(p,system) {
        for(var ri in p.relations){
            var r = p.relations[ri],
                d = system.particles[r],
                l = 0;// r.modelReference[1]??
            if(!d) return;
            // vector D - P
            var dp = d.position.clone().subSelf(p.position);
            l = dp.length();
            if(l==0) {
                dp.set(Math.random(),Math.random(),Math.random());
            }
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
    var f = new EntGL.Force();
    f.type = EntGL.Force.types.LOCAL;
    f.force = function(p) {
        var dp = p.position.clone().normalize();
        dp.multiplyScalar(-g);
        p.accelerations.addSelf(dp)
    }
    return f;
}

function attrito(c){
    var f = new EntGL.Force();
    f.type = EntGL.Force.types.LOCAL;
    f.force = function(p) {
        var s = p.accelerations.clone().multiplyScalar(c);
        p.accelerations.subSelf(s);
    };
    return f;
}