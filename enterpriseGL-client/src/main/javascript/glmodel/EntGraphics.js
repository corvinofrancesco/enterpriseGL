/**
 * Class used to load graphics elements of enterprise rapresentation
 */

function EntGraphics() {
    this.modelLoader = new SimulSystem();
    this.psystem = new ParticleSystem();  
    this.modelLoader.popolate(this.psystem);
    this.primitives = this.retrivePrimitives();
}

EntGraphics.prototype = {
    retrivePrimitives : function() {
        var primitives = [];
        this.psystem.particles.forEach( function(p){
           primitives.concat(new ParticlePrimitive(p));
        });
        var particles = this.psystem.particles;
        this.psystem.relations.forEach( function(r){
            primitives.concat(new RelationPrimitive(
                particles[r.idS], particles[r.idD]));
        });        
        return primitives;
    },
    
    /**
     * Load all particles and relations primitives of enterprise model
     */    
    load : function(gl) {
        
        // load mesh particles
        var p = new Particle("load");
        this.model.particles = this.meshParticle(gl, p);
        // load mesh relations
        
    },

    meshAll : function(gl) {
        var positions = new Float32Array(this.psystem.particlesVertex());
        var edgesIndices = new Uint16Array(this.psystem.particlesEdges());
        //var edgesIndices = new Uint16Array([0,1,1,3,3, 2, 2, 0,5, 4, 4, 6, 6, 7, 7, 5,0, 4, 1, 5, 3, 7, 2, 6]);

        // get the inizialized particles attributes (colors)
        var colors = new Float32Array(this.psystem.particlesColors());                
        var particleSys = new SglMeshGL(gl);
        particleSys.addVertexAttribute("position", 3, positions);
        particleSys.addVertexAttribute("color", 3, colors);
        particleSys.addArrayPrimitives("vertices", gl.POINTS, 0, this.psystem.size());
        particleSys.addIndexedPrimitives("edges", gl.LINES, edgesIndices);
        particleSys.primitives = "vertices";
        return particleSys;
    },
    
    draw : function(gl, t){
        this.primitives.forEach(function(p) {
            p.draw(gl,t);
        });
    },
    
    update : function() {
        //this.modelLoader.update(this.psystem);
        this.psystem.updatePosition();
        this.primitives = this.retrivePrimitives();
    }
}

/**
 * Class for particle graphics element
 */
function ParticlePrimitive(p) {
    this.xyz = new Array(p.x,p.y,p.z);
    this.colors = new Array(p.color.r,p.color.g,p.color.b);    
    this.p = p;
}

ParticlePrimitive.prototype = {
    draw: function(gl,t){
        
        var pMesh = new SglMeshGL(gl);
        pMesh.primitives = "vertices" + this.p.id;
        pMesh.addVertexAttribute("position",3,new Float32Array(this.xyz));
        pMesh.addVertexAttribute("color",3,new Float32Array(this.color));
        pMesh.addArrayPrimitives(pMesh.primitives, gl.POINTS, 0, 1);
        sglRenderMeshGLPrimitives(pMesh, pMesh.primitives, t.simpleProg, null, t.uniform);        
    },
    
    animate: function(){
        this.xyz.forEach(function(v){if(v<10) v+=0.2; else v=-1.3;})
    }
    
}

/**
 * Class for relation graphics element
 */
function RelationPrimitive(p1,p2) {
    this.vertices = new Array(
        p1.x,p1.y,p1.z,
        p2.x,p2.y,p2.z
        );
    this.colors = new Array(
        p1.color.r,p1.color.g,p1.color.b,
        p2.color.r,p2.color.g,p2.color.b
        );        
}

RelationPrimitive.prototype = {
    draw: function(gl,t){
        var rMesh = new SglMeshGL(gl);
        rMesh.addVertexAttribute("position",3,new Float32Array(this.vertices));
        rMesh.addVertexAttribute("color",3,new Float32Array(this.colors));
        rMesh.addArrayPrimitives("vertices", gl.POINTS, 0, 2);
        rMesh.addIndexedPrimitives("edges", gl.LINES, new Uint16Array([0,1]));
        rMesh.primitives = "edges";
        sglRenderMeshGLPrimitives(rMesh, "edges", t.simpleProg, null, t.uniform);        
    },
    
    animate: function() {
        
    }
}