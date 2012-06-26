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
        for(var i in this.psystem.particles){
            var p = this.psystem.particles[i];
            primitives.concat(new ParticlePrimitive(p));
        }
        var particles = this.psystem.particles;
        this.psystem.relations.forEach( function(r){
            primitives.concat(new RelationPrimitive(
                particles[r.idS], particles[r.idD]));
        });        
        return primitives;
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
        var uniform = { u_mvp : t.xform.modelViewProjectionMatrix };        
        var rMesh = new SglMeshGL(gl);
        rMesh.addVertexAttribute("position",3,new Float32Array(this.vertices));
        rMesh.addVertexAttribute("color",3,new Float32Array(this.colors));
        rMesh.addArrayPrimitives("vertices", gl.POINTS, 0, 2);
        rMesh.addIndexedPrimitives("edges", gl.LINES, new Uint16Array([0,1]));
        rMesh.primitives = "edges";
        sglRenderMeshGLPrimitives(rMesh, "edges", t.simpleProg, null, uniform);        
    },
    
    animate: function() {
        
    }
}