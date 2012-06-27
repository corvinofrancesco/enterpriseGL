/**
 * Class used to load graphics elements of enterprise rapresentation
 */
function EntGraphics() {
    this.modelLoader = new SimulSystem();
    this.psystem = new ParticleSystem();  
    this.modelLoader.popolate(this.psystem);
    this.primitives = {
        starParticles : new ParticlePrimitive()
        
    };
}

EntGraphics.prototype = {
    
}

/**
 * Class for particle graphics element
 */
function ParticlePrimitive(program) {
    // inizializza con texture non valida
    this.texture = {isValid: false};
    // programma di rappresentazione della texture
    this.textureShaders = program;   
}

ParticlePrimitive.prototype = {
    
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
    },
    
    /**
     * Disegna una particella 
     * @param 
     */
    draw: function(gl,t){
        /*************************************************************/
        var quadPositions = new Float32Array ([
                -1.0, -1.0,
                 1.0, -1.0,
                -1.0,  1.0,
                 1.0,  1.0
        ]);

        var quadTexcoords = new Float32Array ([
                0.0, 0.0,
                1.0, 0.0,
                0.0, 1.0,
                1.0, 1.0
        ]);

        var quad = new SglMeshGL(gl);
        quad.addVertexAttribute("position", 2, quadPositions);
        quad.addVertexAttribute("texcoord", 2, quadTexcoords);
        quad.addArrayPrimitives("tristrip", gl.TRIANGLE_STRIP, 0, 4);
        this.quadMesh = quad;
        /*************************************************************/
        
        if(this.texture.isValid) {
            var quadUniforms = {u_mvp : t.xform.modelViewProjectionMatrix};
            var quadSamplers = {s_texture : this.texture};
            sglRenderMeshGLPrimitives(this.quadMesh, "tristrip", 
                    this.textureShaders, null, quadUniforms, quadSamplers);            
        }
    },
    
    animate: function(){
        
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