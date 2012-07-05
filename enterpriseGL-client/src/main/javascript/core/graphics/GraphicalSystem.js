/**
 * GraphicalSystem types of event
 */
GraphicalSystem.events = {
    ADD: "add",
    MODIFY: "modify",
    REMOVE: "remove",
    ERROR: "error"
};

/**
 * This class manage whole sistem of particles (interaction and forces)
 */
function GraphicalSystem(){
    // system objects
    this.particles = {};
    this.relations = [];
    // objects for graphical elaboration
    this.objectsCache = [];
    // phisics configurations 
    this.forces = {
        //barneshut:new Force(), 
        /// atraction between particles in relation
        relAttr: attractionForce(this.particles,3,2)};
    // other global variables
    this.numparticles = 0;    
    
    /// basrnes-hut
    //this.forces.barneshut.type = Force.types.GLOBAL;
    this.globalAlg = new BarnesHut();
        
}

GraphicalSystem.prototype = {
    
    getFreeSpace: function(){
       //TODO use global algorith to find a free space
       return new THREE.Vector3(0,0,0);
    },
    
    getSpaceNextTo: function(idParticle){
       //TODO use global algorith to find a free space next to particle
       var p = this.particles[idParticle],v = new THREE.Vector3(0,1,0);
       if(p) return v.addSelf(p.position);
       return null;
    },
    
    /**
     * Search a particle primitive by its reference model id
     * @param idRefParticle identificator of particle in the main reference model
     * @return null if the particle isn't found
     */
    findParticle : function(idRefParticle){
        for(var i in this.particles){
            var p = this.particles[i];
            if(p.modelReference == idRefParticle)
                return p;
        }
        return null;
    },
    
    /**
     * Restituisce tutti gli oggetti grafici del sistema
     */
    get objects(){
        return this.objectsCache;
    },
    
    size : function() {
        return this.numparticles;
    },
    
    update: function(){
        //TODO calculate the differenzial time (dtime) and update particles positions
//        for(var i in this.particles){
//            var p = this.particles[i];
//            for(var axis in p.accelerations){
//              p[axis] += 
//                  0.5* dtime*dtime* p.accelerations[axis] +
//                  dtime* p.velocity[axis];
//              p.velocity[axis] += dtime * p.accelerations[axis];
//            }  
//        }
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
    add : function(p) {
        var genEvent = GraphicalSystem.events.ADD;
        if(this.particles[p.id] != undefined) {
            genEvent = GraphicalSystem.events.MODIFY;
            
        } else {
            // TODO effettuare l'insert nell'algoritmo globale
            //this.globalAlg.insert(p);
            this.numparticles ++;
        }
        this.particles[p.id] = p;
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
            this.event(GraphicalSystem.events.REMOVE, {particle:p})
            this.numparticles--;
        }
        this.event(GraphicalSystem.events.ERROR,{particle:p});
    },
    
    /**
     * Manage 
     */
    event : function(type, props) {
        // TODO make something
    }
    
}