/**
 * Class used to load graphics elements of enterprise rapresentation
 */
function EntGraphics() {
    this.modelLoader = new SimulSystem();
    this.psystem = new ParticleSystem();  
    this.modelLoader.popolate(this.psystem);
    this.primitives = {
        starParticles : new ParticleCube()
        
    };
}

EntGraphics.prototype = {
    
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