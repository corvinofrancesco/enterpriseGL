
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
    }
}