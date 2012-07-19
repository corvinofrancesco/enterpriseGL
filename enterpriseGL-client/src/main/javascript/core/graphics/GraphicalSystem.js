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
        barneshut:new Force(), 
        /// atraction between particles in relation
        relAttr: attractionForce(this.particles,0.02,2),
        centreforce: gravitation(0.009)};
    // other global variables
    this.numparticles = 0;    
    
    /// basrnes-hut
    this.forces.barneshut.type = Force.types.GLOBAL;
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
       // use global algorithm to find a free space
        if(this.size()>0){
            var res =  this.globalAlg.getFreeRegion();
            if(!(res instanceof THREE.Vector3)) {
                res = new THREE.Vector3(2,2,0); 
                res.addSelf(this.objects[this.size()-1].position);
            } 
            return res;
        }
       return new THREE.Vector3(0,0,0);
    },
    
    /**
     * Try to return the nearest free position to a particle
     * @return null if the particle don't exist
     */
    getSpaceNextTo: function(idParticle){        
       //TODO use global algorith to find a free space next to particle
       var p = this.particles[idParticle],v = new THREE.Vector3(0,0,2);       
       try {
           var pos = this.globalAlg.getFreeRegion(p.barneshut.region);
           if(pos instanceof THREE.Vector3) return pos;
           return v.addSelf(p.position);
       } catch(e){ }
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
            p = this.particles[id],
            props = {primitive:p};
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
                this.globalAlg.insert(props.primitive);
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
        this.updateAccelerations();
        //TODO calculate the differenzial time (dtime) and update particles positions
        var dtime = 0.5;
        for(var i in this.particles){
            var p = this.particles[i];            
            // delta = a*t^2/2 + v*t 
            var delta = 
                p.accelerations.clone().multiplyScalar(0.5* dtime*dtime);
            delta.addSelf(p.velocity.clone().multiplyScalar(dtime));
            // deltav = t*a
            var deltav = p.accelerations.clone().multiplyScalar(dtime);
            p.velocity.addSelf(deltav);
            // position += delta;
            p.position.addSelf(delta);
        }
    },
    
    /**
     * This properties calculate all acceleration for particles in 
     * the system.
     */
    updateAccelerations : function() {
        for(var i in this.particles){
            this.particles[i].accelerations = new THREE.Vector3(0,0,0);
            this.particles[i].velocity = new THREE.Vector3(0,0,0);
        }
        this.globalAlg.update();
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
                    for(var i in this.particles){
                        var a = this.globalAlg.getForceFor(this.particles[i]);
                        log(a.length(), "LOG",true);
                        this.particles[i].accelerations.addSelf(a);
                    }
                    break;
                case Force.types.LOCAL:                
                default:
                    //for(var i in this.particles.filter(selector)){
                    for(var i in this.particles){
                        force(this.particles[i]);
                    }
                break;                    
            }
        }
    }    
}