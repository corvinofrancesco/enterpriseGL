
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
        var vertex = new Array();
        this.particles.forEach(function(p){
            vertex = vertex.concat(new Array(p.x,p.y,p.z));
        });
        return vertex;        
    },
    
    particlesDirections: function() {
        var directions = new Array();
        this.particles.forEach(function(p){
            directions = directions.concat(p.dirArray());
        });
        return directions;        
        
    },

    particlesVelocities: function() {
        var velocities = new Array();
        this.particles.forEach(function(p){
            velocities = velocities.concat(p.velArray());
        });
        return velocities;                
    },
    
    particlesAccelerations: function() {
        var accelerations = new Array();
        this.particles.forEach(function(p){
            accelerations = accelerations.concat(p.accArray());
        });
        return accelerations;                
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