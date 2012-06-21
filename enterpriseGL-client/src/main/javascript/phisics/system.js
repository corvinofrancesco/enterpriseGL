
function ParticleSystem(){
    this.particles = [];
    this.relations = [];
    this.textures = [];
    this.cameraMatrix = null;
}

ParticleSystem.prototype = {
    
    /**
     * Calculate the four vertex for a particle in the array
     */
    particleVertex : function(idParticle) {
        //TODO project particle position on camera axis
        //TODO calculate particle's 4 vertex 
    },
    
    size : function() {
        return this.particles.length;
    },
    
    /**
     * Returns an Array of all particles vertex (particle as one point)
     */
    particlesVertex : function() {
        
    },
    
    /**
     * Returns an Array of all particles relations
     */
    particlesEdges : function() {
        var edges = new Array();
        for(var j =0;j<this.relations.length;j++){
            /// use getArray property for Relation object
            edges = edges.concat(this.relations[j].getArray());
        }
        return edges;
    }
}