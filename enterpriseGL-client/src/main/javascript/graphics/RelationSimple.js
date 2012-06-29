/**
 * Class for relation graphics element
 */
function RelationPrimitive() {
    // shaders for relations
    this.idVShaderSrc = "SIMPLE_VERTEX_SHADER";
    this.idFShaderSrc = "SIMPLE_FRAGMENT_SHADER";
    this.program = null;
}

RelationPrimitive.prototype = {
    load: function(gl,reqManager){
        
    },
    
    draw: function(gl,t,r){
        var p1 = r.source, p2 = r.destination;
        this.vertices = new Array(
            p1.x,p1.y,p1.z,
            p2.x,p2.y,p2.z
            );
        this.colors = new Array(
            p1.color.r,p1.color.g,p1.color.b,
            p2.color.r,p2.color.g,p2.color.b
            );        
        var uniform = { u_mvp : t.xform.modelViewProjectionMatrix };        
        var rMesh = new SglMeshGL(gl);
        rMesh.addVertexAttribute("position",3,new Float32Array(this.vertices));
        rMesh.addVertexAttribute("color",3,new Float32Array(this.colors));
        rMesh.addArrayPrimitives("vertices", gl.POINTS, 0, 2);
        rMesh.addIndexedPrimitives("edges", gl.LINES, new Uint16Array([0,1]));
        rMesh.primitives = "edges";
        sglRenderMeshGLPrimitives(rMesh, "edges", this.program, null, uniform);        
    },
    
    animate: function() {
        
    }
}   
