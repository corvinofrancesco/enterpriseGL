/**
 * Class used to load the enviroment: shaders, canvas 
 */
var z = 8;
function EnvModel(){
    this.idCanvas = "SGL_CANVAS1";
    // shaders for relations
    this.idRelationVShader = "SIMPLE_VERTEX_SHADER";
    this.idRelationFShader = "SIMPLE_FRAGMENT_SHADER";
    // shaders for particle texture 
    this.idParticleVShader = "TEX_VERTEX_SHADER";
    this.idParticleFShader = "TEX_FRAGMENT_SHADER";
    
    // TODO initialize the model
    this.models = new EntGraphics();
    this.running = false;
    
}
 
EnvModel.prototype = {
    setup: function (idCanvas, idVSh, idFSh) {
        // control attributes initialisation
        if(idCanvas) this.idCanvas = idCanvas;
        if(idVSh) this.idRelationVShader = idVSh;
        if(idFSh) this.idRelationFShader = idFSh;
            
        // register Canvas
        sglRegisterCanvas(this.idCanvas, this, 60.0);  
    },
        
    load : function(gl){

        /*************************************************************/
        this.xform = new SglTransformStack();
        this.xform.projection.loadIdentity();
        this.xform.projection.perspective(sglDegToRad(45.0), 1.4, 0.1, 40000.0);
        this.xform.view.loadIdentity();
        this.xform.view.lookAt(0.0, -z, z, 0.0,0.0,0.0, 0.0,1.0,0.0);
        this.xform.model.loadIdentity();
        /*************************************************************/
 
        /*************************************************************/
        var simpleVsrc = sglNodeText(this.idRelationVShader); 
        var simpleFsrc = sglNodeText(this.idRelationFShader); 
        var simpleProg = new SglProgram(gl, [simpleVsrc], [simpleFsrc]); 
        this.simpleProg = simpleProg;
        /*************************************************************/
 
        /*************************************************************/
        var texVsrc = sglNodeText(this.idParticleVShader);
        var texFsrc = sglNodeText(this.idParticleFShader);
        var texProg = new SglProgram(gl, [texVsrc], [texFsrc]);
        this.texProg = texProg;
        /*************************************************************/ 
 
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
                
        /*************************************************************/
        var texOpt = {
                generateMipmap : true,
                minFilter      : gl.LINEAR_MIPMAP_LINEAR,
                onload         : this.ui.requestDraw
        };
        var tex = new SglTexture2D(gl, "star.gif", texOpt);
        this.tex = tex;
        /*************************************************************/
 
        /*************************************************************/ 
        // setup point of view and interaction objects
        var eye = sglNormalizedV3([5.0, 4.0, 5.0]);
        eye = sglMulSV3(4.0, eye);		
        this.viewMatrix = sglLookAtM4C(eye[0], eye[1], eye[2], 0.0, 1.0, 0.0, 0.0, 1.0, 0.0);
        this.trackball = new SglTrackball();
                
    /*************************************************************/
    },
 
    keyPress : function(gl, keyCode, keyString) {
        switch (keyString) {
            /** rotation */
            case "a":
                this.angle -= 15.0 ;
                break;
            case "d":
                this.angle += 15.0;
                break;
            case "s":
                this.rotation = !this.rotation; 
                break;
            case "m":
                this.running = !(this.running);
                break;
            default :
                break;
        }
    },
        
    mouseMove : function(gl, x, y){
        var ui = this.ui;

        var ax1 = (x / (ui.width  - 1)) * 2.0 - 1.0;
        var ay1 = (y / (ui.height - 1)) * 2.0 - 1.0;

        var action = SGL_TRACKBALL_NO_ACTION;
        if ((ui.mouseButtonsDown[0] && ui.keysDown[17]) || ui.mouseButtonsDown[1]) {
            action = SGL_TRACKBALL_PAN;
        } else if (ui.mouseButtonsDown[0]) {
            action = SGL_TRACKBALL_ROTATE;
        }

        this.trackball.action = action;
        this.trackball.track(this.viewMatrix, ax1, ay1, 0.0);
        this.trackball.action = SGL_TRACKBALL_NO_ACTION;
    },

    mouseWheel: function(gl, wheelDelta, x, y) {
        var action = (this.ui.keysDown[16]) ? (SGL_TRACKBALL_DOLLY) : (SGL_TRACKBALL_SCALE);
        var factor = (action == SGL_TRACKBALL_DOLLY) ? (wheelDelta * 0.3) : ((wheelDelta < 0.0) ? (1.10) : (0.90));

        this.trackball.action = action;
        this.trackball.track(this.viewMatrix, 0.0, 0.0, factor);
        this.trackball.action = SGL_TRACKBALL_NO_ACTION;
    },
        
    update : function(gl, dt) {
        if(this.rotation) this.angle += 90.0 * dt;
        if(this.running){
            this.models.psystem.updateAccelerations();
            this.models.psystem.updatePosition(0.1);            
        }
        log(this.trackball.matrix,"VIEWMATRIX",true);
    },
 
    draw : function(gl){
        var w = this.ui.width;
        var h = this.ui.height;
        gl.clearColor(0, 0, 0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
        gl.viewport(0, 0, w, h);
        

        this.xform.projection.push();
        this.xform.projection.loadIdentity();
        this.xform.projection.perspective(sglDegToRad(45.0), w/h, 0.1, 100.0);
                
        this.xform.view.push();
        this.xform.view.load(this.viewMatrix);
        this.xform.view.multiply(this.trackball.matrix);

        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.enable(gl.BLEND);
        
        for(var i in this.models.psystem.particles){
          var p = this.models.psystem.particles[i];
          this.xform.model.push();
          this.xform.model.loadIdentity();
          
          var n = [0,0,1], p = [p.x,p.y,p.z];
          mat4.multiplyVec3(this.trackball.matrix,n);
          mat4.multiplyVec3(this.trackball.matrix,p);
          var dir = vec3.create();vec3.subtract(n,p,dir);
          var alpha = Math.atan(vec3.length(dir)/vec3.length(n) );
          vec3.normalize(dir);
          
          
          log(vec3.str(n) + "," +
                vec3.str(p) + "->" + alpha ,"ROTATION",true);
        
//          vec3.normalize(n); vec3.normalize(p);
//          var matrix = vec3.rotationTo(n,p);
//          this.xform.model.multiply(matrix);
          //this.xform.model.multiply(this.xform.viewMatrix);
          //this.xform.model.multiply(this.xform.projectionMatrix);
          //this.xform.model.rotate(anglerad,px,py,pz);
          
          
          //this.xform.model.translate(p.x,p.y,p.z);
          this.xform.model.rotate(alpha,dir[0],dir[1],dir[2]);
          //this.xform.model.scale(0.1,0.1,0.1);
          this.drawCube(gl,p.x,p.y,p.z);
          this.xform.model.pop();
        }  
        
        gl.disable(gl.BLEND);

        for(var i in this.models.psystem.relations) {
          var r = this.models.psystem.relations[i];
          var p1 = this.models.psystem.particles[r.idS];
          var p2 = this.models.psystem.particles[r.idD];
          this.xform.model.push();
          this.xform.model.loadIdentity();
          this.drawRelation(gl,new RelationPrimitive(p1,p2)); 
          this.xform.model.pop();
        }

    },
    
    drawCube : function(gl,px,py,pz){

        if (this.tex.isValid) {
                var quadUniforms = {u_mvp : this.xform.modelViewProjectionMatrix};
                var quadSamplers = {s_texture : this.tex};
                sglRenderMeshGLPrimitives(this.quadMesh, "tristrip", this.texProg, null, quadUniforms, quadSamplers);
        }
    },
    
    drawRelation: function(gl,r) {
        r.draw(gl,this);
    }
    
}; 
