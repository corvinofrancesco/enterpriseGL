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
    this.forces = {
        //barneshut:new Force(), 
        relAttr: new Force()};
    this.numparticles = 0;    
    
    /// basrnes-hut
    //this.forces.barneshut.type = Force.types.GLOBAL;
    this.globalAlg = new BarnesHut();
    
    /// atraction between particles in relation
    var particles = this.particles;
    this.forces.relAttr.force = function(r){
        var sPart = particles[r.idS];//this.particles[r.idS];
        var dPart = particles[r.idD];//this.particles[r.idD];
        var dir = {
            x: sPart.x - dPart.x,
            y: sPart.y - dPart.y,
            z: sPart.z - dPart.z
        };
        if(dir.x*dir.x + dir.y*dir.y + dir.z*dir.z>1){
        sPart.accelerations = {x:-dir.x, y:-dir.y, z: -dir.z}; // -dir
        dPart.accelerations = dir;   // dir
        }
    };
    this.forces.relAttr.type = Force.types.ONRELATIONS;
    
}

ParticleSystem.prototype = {
    
    size : function() {
        return this.numparticles;
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
        for(var p in this.particles){
            this.particles[p].accelerations = {x:0,y:0,z:0};
        }
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
            this.numparticles ++;
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
            this.numparticles--;
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