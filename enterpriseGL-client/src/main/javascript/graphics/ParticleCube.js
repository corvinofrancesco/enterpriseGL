/**
 * Draw a Cube Particle 
 */
function ParticleCube(){
    /// shader configurations
    this.idVShaderSrc = "SIMPLE_VERTEX_SHADER";
    this.idFShaderSrc = "SIMPLE_FRAGMENT_SHADER";
    this.program = null;
    /// description configurations
    this.width = 0.2;
    this.colors = [];
    for(var i =0;i<8;i++) 
        this.colors = this.colors.concat([0.0,0.0,1.0]);
}

ParticleCube.prototype = {
    /**
     * @param gl oggetto rappresentante l'interfaccia webgl
     * @param reqManager gestore della richiesta, 
     * utilizzato per il caricamento delle texture e altre interazioni
     */
    load: function(gl,reqManager) {
        var d = this.width;
        var boxPositions = new Float32Array ([
                -d, -d,  d, d, -d,  d,
                -d,  d,  d, d,  d,  d,
                -d, -d, -d, d, -d, -d,
                -d,  d, -d, d,  d, -d
        ]);
        var boxColors = new Float32Array(this.colors);

        var boxTrianglesIndices = new Uint16Array([
                0, 1, 2,  2, 1, 3,  // front
                5, 4, 7,  7, 4, 6,  // back
                4, 0, 6,  6, 0, 2,  // left
                1, 5, 3,  3, 5, 7,  // right
                2, 3, 6,  6, 3, 7,  // top
                4, 5, 0,  0, 5, 1   // bottom
        ]);

        var box = new SglMeshGL(gl);
        box.addVertexAttribute("position", 3, boxPositions);
        box.addVertexAttribute("color",    3, boxColors);
        box.addIndexedPrimitives("triangles", gl.TRIANGLES, boxTrianglesIndices);
        this.boxMesh = box;
    },
    
    draw: function(gl,t,p) {
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);

        t.xform.model.translate(p.x,p.y,p.z);
        var boxUniforms = { u_mvp : t.xform.modelViewProjectionMatrix };
        sglRenderMeshGLPrimitives(this.boxMesh,"triangles",
            this.program,null,boxUniforms);

        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);
    }
}