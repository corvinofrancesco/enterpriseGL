/**
 * This class manage whole sistem of particles (interaction and forces)
 */
function GraphicalSystem(){
    // system objects
    this.particles = {};
    // objects for graphical elaboration
    this.objects = [];
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

/**
 * GraphicalSystem types of event
 */
GraphicalSystem.events = {
    ADD: "add",
    MODIFY: "modify",
    REMOVE: "remove",
    ERROR: "error"
};
    
GraphicalSystem.prototype = {


    /***************************************************************************
     * Spatial functions 
     */
    
    /**
     * This function return the first area free, so we can collocate new particles
     * @return if the space is empty return (0,0,0)
     */
    getFreeSpace: function(){
        if(this.size()>0){
            var b = new THREE.Vector3(2,2,0); 
            b.addSelf(this.objects[this.size()-1].position);
            return b;
        }
       //TODO use global algorith to find a free space
       return new THREE.Vector3(0,0,0);
    },
    
    /**
     * Try to return the nearest free position to a particle
     * @return null if the particle don't exist
     */
    getSpaceNextTo: function(idParticle){
       //TODO use global algorith to find a free space next to particle
       var p = this.particles[idParticle],v = new THREE.Vector3(0,2,0);
       if(p) return v.addSelf(p.position);
       return null;
    },
    
    /***************************************************************************
     * Particles management functions
     */
    
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
     * Numbers of all particles in the system
     */
    size : function() {
        return this.numparticles;
    },
    
    /**
     * Add a particle to the system.
     * La particella avrà nell'array particles id analogo al suo valore in modo
     * da essere recuperata.
     * Per essere modificata basta richiamare lo stesso metodo.
     * @param p primitive of a particle
     */
    add : function(p) {
        var genEvent = GraphicalSystem.events.ADD,
            props = {primitive: p};
        if(this.particles[p.id] != undefined) {
            genEvent = GraphicalSystem.events.MODIFY;
        } else {
            this.numparticles ++;
            this.objects.push(p);
        }
        this.particles[p.modelReference] = p;
        // register event
        this.event(genEvent, props);
    },
    
    /**
     * Si occupa di rimuovere una particella dal sistema,
     * Se la particella non esiste genera un evento ERROR
     * @param id reference model id of particle to remove
     * @return the object removed, null otherwise
     */
    remove : function(id) {
        var ev = GraphicalSystem.events.REMOVE,
            props = {primitive:p},
            p = this.particles[id];
        if(p) {
            this.particles[id] = undefined;
            this.numparticles--;
        } else ev = GraphicalSystem.events.ERROR;
        this.event(ev,props);
        return p;
    },
    
    /***************************************************************************
     * System management functions
     */
    
    /**
     * Manage system events
     * @param type is a GraphicalSystem.events value, defines what happen
     * @param props 
     */
    event : function(type, props) {
        switch(type){
            case GraphicalSystem.events.ADD:
                // TODO per le particelle effettuare l'insert nell'algoritmo globale
                //this.globalAlg.insert(p);
                break;
            case GraphicalSystem.events.MODIFY:
                // TODO avviare l'aggiornamento delle forze
                break;
            case GraphicalSystem.events.REMOVE:
                // TODO avviare l'aggiornamento delle forze
                break;
            default:                
        }
        // TODO make something
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
    }    
}