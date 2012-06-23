/**
 * Class used to load graphics elements of enterprise rapresentation
 */

function EntGraphics() {
    this.modelLoader = new SimulSystem();
    this.psystem = new ParticleSystem();     
}

EntGraphics.prototype = {
    /**
     * Load all particles and relations primitives of enterprise model
     */    
    load : function() {

                var positions = new Float32Array(this.psystem.particlesVertex());
                var edgesIndices = new Uint16Array(this.psystem.particlesEdges());
                //var edgesIndices = new Uint16Array([0,1,1,3,3, 2, 2, 0,5, 4, 4, 6, 6, 7, 7, 5,0, 4, 1, 5, 3, 7, 2, 6]);
                // get the inizialized forces (directions, velocities and accelerations)
                var directions = new Float32Array(this.psystem.particlesDirections());
                var velocities = new Float32Array(this.psystem.particlesVelocities());
                var accelerations = new Float32Array(this.psystem.particlesAccelerations());
                // get the inizialized particles attributes (colors)
		var colors = new Float32Array(this.psystem.particlesColors());                
                var particleSys = new SglMeshGL(gl);
                    particleSys.addVertexAttribute("position", 3, positions);
                    particleSys.addVertexAttribute("color", 3, colors);
                    particleSys.addVertexAttribute("direction", 3, directions);
                    particleSys.addVertexAttribute("velocity", 3, velocities);
                    particleSys.addVertexAttribute("acceleration", 3, accelerations);
                    particleSys.addArrayPrimitives("vertices", gl.POINTS, 0, this.psystem.size());
                    particleSys.addIndexedPrimitives("edges", gl.LINES, edgesIndices);
                    particleSys.primitives = "vertices";
                    this.particleSys = particleSys;


    },
    
    update : function() {
        
    }
}