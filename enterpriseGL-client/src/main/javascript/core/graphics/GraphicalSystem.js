/**
 * This class manage whole sistem of particles (interaction and forces)
 */
function GraphicalSystem(){
    // system objects
    this.particles = {};
    // objects for graphical elaboration
    this.objects = [];
    // phisics configurations 
    this._distributionAlg = new DistributionGraph();//Alg();
    this._distributionAlg.setSystemRepos(this);
    this.forces = {
        /// atraction between particles in relation
        relAttr: attractionForce(0.02,2),
        centreforce: gravitation(0.009)
    };
    // other global variables
    this.numparticles = 0;    
            
}

GraphicalSystem.prototype = {


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
     * La particella avrà nell'array particles id analogo al suo valore in modo
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
        return p;
    },
    
    /***************************************************************************
     * System management functions
     */

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
        this._distributionAlg.update(this);
        for(var findex in this.forces){
            // funzione che calcola la forza da applicare
            var force = this.forces[findex].force;
            switch(this.forces[findex].type) {
                case Force.types.GLOBAL:
                    // configura l'algoritmo globale 
                    // con i parametri della forza
                    this._distributionAlg.configureFor(
                        this.forces[findex]);
                    // aggiunge il calcolo delle forze
                    for(var j in this.particles){
                        var a = this.globalAlg.getForceFor(this.particles[j]);
                        this.particles[j].accelerations.addSelf(a);
                    }
                    break;
                case Force.types.ONRELATIONS:
                    for(var k in this.particles){
                        force(this.particles[k],this);
                    }
                    break;
                case Force.types.LOCAL:                
                default:
                    for(var k in this.particles){
                        force(this.particles[k]);
                    }
                break;                    
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
        this._distributionAlg = new DistributionAlg();
        this._distributionAlg.setSystemRepos(this);
        this.forces = {
            /// atraction between particles in relation
            relAttr: attractionForce(0.02,2),
            centreforce: gravitation(0.009)
        };
        // other global variables
        this.numparticles = 0;    
    }

}