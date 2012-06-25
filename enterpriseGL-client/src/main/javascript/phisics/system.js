/**
 * This class manage whole sistem of particles (interaction and forces)
 */

function ParticleSystem(){
    this.particles = [];
    this.relations = [];
    this.textures = [];
    this.cameraMatrix = null;
}

ParticleSystem.prototype = {
    
    size : function() {
        return this.particles.length;
    },
    
    updatePosition: function(dtime){
        this.particles.forEach(function(p){
          for(var axis in p.accelerations){
              p[axis] += 
                  0.5* dtime*dtime* p.accelerations[axis] +
                  dtime* p.velocity[axis];
              p.velocity[axis] += dtime * p.accelerations[axis];
          }  
        });
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

    particlesColors : function() {
        var colors = new Array();
        this.particles.forEach(function(p){
            colors = colors.concat(p.colArray());
        });
        return colors;                
    },
    
    /**
     * Returns an Array of all particles relations
     */
    particlesEdges : function() {
        var edges = new Array();
        this.relations.forEach(function(r){
            edges = edges.concat(r.getArray());
        });
        return edges;                
    }
}