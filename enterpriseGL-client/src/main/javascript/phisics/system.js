/**
 * ParticleSystem types of event
 */
ParticleSystem.events = {
    ADD: "add",
    MODIFY: "modify",
    REMOVE: "remove",
    ERROR: "error"
};

/**
 * This class manage whole sistem of particles (interaction and forces)
 */
function ParticleSystem(){
    this.particles = {};
    this.relations = [];
    this.forces = {};
    this.globalAlg = new BarnesHut();
}

ParticleSystem.prototype = {
    
    size : function() {
        return this.particles.length;
    },
    
    updatePosition: function(dtime){
        for(var i in this.particles){
            var p = this.particles[i];
            for(var axis in p.accelerations){
              p[axis] += 
                  0.5* dtime*dtime* p.accelerations[axis] +
                  dtime* p.velocity[axis];
              p.velocity[axis] += dtime * p.accelerations[axis];
            }  
        }
    },
    
    /**
     * This properties calculate all acceleration for particles in 
     * the system.
     */
    updateAccelerations : function() {
        for(var findex in this.forces){
            // funzione che calcola la forza da applicare
            var force = this.forces[findex].force;
            // seleziona le relazioni su cui applicare la forza
            var selector = this.forces[findex].selector;   
            switch(this.forces[findex].type) {
                case Force.types.GLOBAL:
                    // configura l'algoritmo globale 
                    // con i parametri della forza
                    this.globalAlg.configureFor(
                        this.forces[findex]);
                    // aggiunge il calcolo delle forze
                    for(var i in this.particles)
                        this.globalAlg.getForceFor(this.particles[i]);
                    break;
                case Force.types.ONRELATIONS:
                    for(var r in this.relations.filter(selector)){
                        force(this.relations[r]);
                    }
                    break;
                case Force.types.LOCAL:                
                default:
                    for(var i in this.particles.filter(selector)){
                        force(this.particles[i]);
                    }
                break;                    
            }
        }
    },
    
    /**
     * Aggiunge una particella al sistema.
     * La particella avrà nell'array particles id analogo al suo valore in modo
     * da essere recuperata.
     * Per essere modificata basta richiamare lo stesso metodo.
     */
    add : function(p, relations) {
        var genEvent = ParticleSystem.events.ADD;
        if(this.particles[p.id] != undefined) {
            genEvent = ParticleSystem.events.MODIFY;
            
        } else {
            // TODO effettuare l'insert nell'algoritmo globale
            this.globalAlg.insert(p);
        }
        this.particles[p.id] = p;
        if(relations) {
            this.relations = this.relations.concat(relations);
        }
        // TODO make something with globalAlg
        this.event(genEvent, {particle:p});
    },
    
    /**
     * Si occupa di rimuovere una particella dal sistema,
     * Se la particella non esiste genera un evento ERROR
     */
    remove : function(id) {
        if(this.particles[id]) {
            var p = this.particles[id];
            this.particles[id] = undefined;
            // TODO make something with globalAlg
            this.event(ParticleSystem.events.REMOVE, {particle:p})
        }
        this.event(ParticleSystem.events.ERROR,{particle:p});
    },
    
    /**
     * Manage 
     */
    event : function(type, props) {
        // TODO make something
    }
    
}