/**
 * This class manage whole sistem of particles (interaction and forces)
 */
EntGL.System = {
    // system objects
    particles: {},
    numparticles: 0,    
    forces: {},
    // objects for graphical elaboration
    objects: [],
    init: function (){
        // phisics configurations 
        this._distributionAlg = new DistributionAlg();//Graph();
        this._distributionAlg.setSystemRepos(this);
        this.forces = {
            /// atraction between particles in relation
            relAttr: attractionForce(0.02,2),
            centreforce: gravitation(0.009)
        }

    },


    /***************************************************************************
     * Spatial functions 
     */
    
    /**
     * This function return the first area free, so we can collocate new particles
     * If the particle have relations.. this method try to return the nearest 
     * free position to relational particles
     * 
     * @param p graphical particle to create
     * @return if the space is empty return (0,0,0)
     */
    getFreeSpace: function(p){
       return this._distributionAlg.getPositionFor(p);
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
     * La particella avr� nell'array particles id analogo al suo valore in modo
     * da essere recuperata.
     * Per essere modificata basta richiamare lo stesso metodo.
     * @param p primitive of a particle
     */
    add : function(p) {
        if(this.particles[p.id] != undefined) {
        } else {
            this.numparticles ++;
            this.objects.push(p);
        }
        this.particles[p.modelReference] = p;
        this._distributionAlg.insert(p);            

    },
    
    /**
     * Si occupa di rimuovere una particella dal sistema,
     * @param id reference model id of particle to remove
     * @return the object removed, null otherwise
     */
    remove : function(id) {
        var p = this.particles[id];
        if(p) {
            this.particles[id] = undefined;
            this.numparticles--;
        }
        this._distributionAlg.remove(p);            
        return p;
    },
    
    /***************************************************************************
     * System management functions
     */

    update: function(){
        this.updateAccelerations();
        this.collisions();
        //TODO calculate the differenzial time (dtime) and update particles positions
        var dtime = 0.5;
        for(var i in this.particles){
            var p = this.particles[i],            
                // delta = a*t^2/2 + v*t 
                delta = p.accelerations.clone().multiplyScalar(0.5* dtime*dtime),
                // deltav = t*a
                deltav = p.accelerations.clone().multiplyScalar(dtime);
            delta.addSelf(p.velocity.clone().multiplyScalar(dtime));
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
        var index, force, pindex;
        for(index in this.particles){
            this.particles[index].accelerations = new THREE.Vector3(0,0,0);
            this.particles[index].velocity = new THREE.Vector3(0,0,0);
        }
        this._distributionAlg.update(this);
        for(index in this.forces){
            // funzione che calcola la forza da applicare
            force = this.forces[index].force;
            switch(this.forces[index].type) {
                case EntGL.Force.types.GLOBAL:
                    for(pindex in this.particles){
                        force(this.particles[pindex],this,
                            this._distributionAlg.root());
                    }
                    break;
                case EntGL.Force.types.ONRELATIONS:
                    for(pindex in this.particles){
                        var part = this.particles[pindex],
                            rindex;
                        for(rindex in part.relations)
                            force(part,part.relations[rindex],this);
                    }
                    break;
                case EntGL.Force.types.LOCAL:                
                default:
                    for(pindex in this.particles){
                        force(this.particles[pindex]);
                    }
                break;                    
            }
        }
    },   
    
    collisions: function(){
        var collisions = this._distributionAlg.getCollisions(), collision;
        while(collisions.length>0){
            collision = collisions.shift();
            for(var j in collision){
                var partId = collision[j],
                    p = this.particles[partId];
                p.accelerations.addSelf(new THREE.Vector3(
                    Math.random(), Math.random(), Math.random()
                ))
            }
        }
    },
    
    /***************************************************************************
     *  Configuration functions
     */
    
    changeDistribution: function(distribution){
        if(!(distribution instanceof DistributionAlg)) return false;
        this._distributionAlg = distribution;
        this._distributionAlg.setSystemRepos(this);
        for(var p in this.particles){
            var curr = this.particles[p];
            curr.position.copy(this._distributionAlg.getPositionFor(curr));
            this._distributionAlg.insert(curr);            
        }
        return true;        
    },
    
    reset: function(){
        // system objects
        this.particles = {};
        // objects for graphical elaboration
        this.objects = [];
        // phisics configurations 
        this.changeDistribution(new DistributionAlg());
//        this._distributionAlg = new DistributionAlg();
//        this._distributionAlg.setSystemRepos(this);
        this.forces = {
            /// atraction between particles in relation
            relAttr: attractionForce(0.02,2),
            centreforce: gravitation(0.009)
        };
        // other global variables
        this.numparticles = 0;    
    }

}