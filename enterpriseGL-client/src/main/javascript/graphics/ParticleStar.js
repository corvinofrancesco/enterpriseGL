/**
 * Draw a Star Particle
 */
function ParticleStar(){
    /// shader configurations
    this.idVShaderSrc = "TEX_VERTEX_SHADER";
    this.idFShaderSrc = "TEX_FRAGMENT_SHADER";
    this.program = null;
    // inizializza con texture non valida
    this.texture = {isValid: false};
}

ParticleStar.prototype = {
    
    /**
     * Carica la texture della tipologia di particella
     * @param gl oggetto rappresentante l'interfaccia webgl
     * @param reqManager oggetto che gestisce il canvas
     */
    load: function(gl,reqManager){
        var texOpt = {
                generateMipmap : true,
                minFilter      : gl.LINEAR_MIPMAP_LINEAR,
                onload         : reqManager.ui.requestDraw
        };
        var tex = new SglTexture2D(gl, "star.gif", texOpt);
        this.texture = tex;
        /*************************************************************/
        var quadPositions = new Float32Array ([
                -1.0, -1.0, 0,
                +1.0, -1.0, 0,
                -1.0, +1.0, 0,
                +1.0, +1.0, 0
        ]);
        
        var quadTexcoords = new Float32Array ([
                0.0, 0.0,
                1.0, 0.0,
                0.0, 1.0,
                1.0, 1.0
        ]);

        var quad = new SglMeshGL(gl);
        quad.addVertexAttribute("position", 3, quadPositions);
        quad.addVertexAttribute("texcoord", 2, quadTexcoords);
        quad.addArrayPrimitives("tristrip", gl.TRIANGLE_STRIP, 0, 4);
        this.quadMesh = quad;
        /*************************************************************/

    },
    
    /**
     * Disegna una particella 
     * @param 
     */
    draw: function(gl,t,p){
        // we don't have texture to display
        if(!this.texture.isValid) return;        
        var vp = vec3.create([p.x,p.y,p.z]);
        mat4.multiplyVec3( t.xform.modelViewProjectionMatrix, vp);
        var quadUniforms = {u_mvp : t.xform.modelViewProjectionMatrix};
        var quadSamplers = {s_texture : this.texture};
        sglRenderMeshGLPrimitives(this.quadMesh, "tristrip", 
                this.program, null, quadUniforms, quadSamplers);            
    },
    
    animate: function(){
        
    }
    
    
}