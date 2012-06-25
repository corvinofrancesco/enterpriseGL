/**
 * Class used to load the enviroment: shaders, canvas 
 */
var z = 8;
function EnvModel(){
    this.idCanvas = "SGL_CANVAS1";
    this.idVertexShader = "SIMPLE_VERTEX_SHADER";
    this.idFragmentShader = "SIMPLE_FRAGMENT_SHADER";   
    // TODO initialize the model
    this.models = new EntGraphics();
    
}
 
EnvModel.prototype = {
    setup: function (idCanvas, idVSh, idFSh) {
        // control attributes initialisation
        if(idCanvas) this.idCanvas = idCanvas;
        if(idVSh) this.idVertexShader = idVSh;
        if(idFSh) this.idFragmentShader = idFSh;
            
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
        var simpleVsrc = sglNodeText(this.idVertexShader); 
        var simpleFsrc = sglNodeText(this.idFragmentShader); 
        var simpleProg = new SglProgram(gl, [simpleVsrc], [simpleFsrc]); 
        this.simpleProg = simpleProg;
        /*************************************************************/
 
        /*************************************************************/
        var texVsrc = sglNodeText("TEX_VERTEX_SHADER");
        var texFsrc = sglNodeText("TEX_FRAGMENT_SHADER");
        var texProg = new SglProgram(gl, [texVsrc], [texFsrc]);
        this.texProg = texProg;
        /*************************************************************/ 
 
        /*************************************************************/
        var quadPositions = new Float32Array
        ([
                -1.0, -1.0,
                 1.0, -1.0,
                -1.0,  1.0,
                 1.0,  1.0
        ]);

        var quadTexcoords = new Float32Array
        ([
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
        var boxPositions = new Float32Array
        ([
                -0.5, -0.5,  0.5,
                 0.5, -0.5,  0.5,
                -0.5,  0.5,  0.5,
                 0.5,  0.5,  0.5,
                -0.5, -0.5, -0.5,
                 0.5, -0.5, -0.5,
                -0.5,  0.5, -0.5,
                 0.5,  0.5, -0.5
        ]);

        var boxColors = new Float32Array
        ([
                0.0, 0.0, 1.0,
                1.0, 0.0, 1.0,
                0.0, 1.0, 1.0,
                1.0, 1.0, 1.0,
                0.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                0.0, 1.0, 0.0,
                1.0, 1.0, 0.0
        ]);

        var boxTrianglesIndices = new Uint16Array
        ([
                0, 1, 2,  2, 1, 3,  // front
                5, 4, 7,  7, 4, 6,  // back
                4, 0, 6,  6, 0, 2,  // left
                1, 5, 3,  3, 5, 7,  // right
                2, 3, 6,  6, 3, 7,  // top
                4, 5, 0,  0, 5, 1   // bottom
        ]);

        var boxEdgesIndices = new Uint16Array
        ([
                0, 1, 1, 3, 3, 2, 2, 0,  // front
                5, 4, 4, 6, 6, 7, 7, 5,  // back
                0, 4, 1, 5, 3, 7, 2, 6   // middle
        ]);

        var box = new SglMeshGL(gl);
        box.addVertexAttribute("position", 3, boxPositions);
        box.addVertexAttribute("color",    3, boxColors);
        box.addArrayPrimitives("vertices", gl.POINTS, 0, 8);
        box.addIndexedPrimitives("triangles", gl.TRIANGLES, boxTrianglesIndices);
        box.addIndexedPrimitives("edges",     gl.LINES,    boxEdgesIndices);
        this.boxMesh = box;
        /*************************************************************/



 
 
 
 
 
 
        /*************************************************************/ 
        // load particles primitives
//        this.models.gl = gl;
//        this.models.load();

        // setup point of view and interaction objects
        var eye = sglNormalizedV3([5.0, 4.0, 5.0]);
        eye = sglMulSV3(4.0, eye);		
        this.viewMatrix = sglLookAtM4C(eye[0], eye[1], eye[2], 0.0, 1.0, 0.0, 0.0, 1.0, 0.0);
        this.trackball = new SglTrackball();
                
    /*************************************************************/
    },
 
    keyPress : function(gl, keyCode, keyString) {
        switch (keyString) {



			case "1": this.primitives = "triangles"; break;
			case "2": this.primitives = "edges";     break;
			case "3": this.primitives = "vertices";  break;



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
                //this.psystem.updatePosition();
                //this.particleSys.removeVertexAttribute("position"); 
                //var positions = new Float32Array(this.psystem.particlesVertex());
                //this.particleSys.addVertexAttribute("position", 3, positions);  
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

    mouseWheel: function(gl, wheelDelta, x, y)
    {
        var action = (this.ui.keysDown[16]) ? (SGL_TRACKBALL_DOLLY) : (SGL_TRACKBALL_SCALE);
        var factor = (action == SGL_TRACKBALL_DOLLY) ? (wheelDelta * 0.3) : ((wheelDelta < 0.0) ? (1.10) : (0.90));

        this.trackball.action = action;
        this.trackball.track(this.viewMatrix, 0.0, 0.0, factor);
        this.trackball.action = SGL_TRACKBALL_NO_ACTION;
    },
        
    update : function(gl, dt) {
        this.timeShader += 0.50 * dt; 
        if(this.rotation) this.angle += 90.0 * dt;
    //if(this.timeShader>4) this.timeShader=0.0;	        
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
        
        this.uniform = {
            u_mvp : this.xform.modelViewProjectionMatrix , 
            timeShader: this.timeShader
            };
//            
//        gl.enable(gl.VERTEX_PROGRAM_POINT_SIZE);
//        gl.enable(gl.BLEND);
//        gl.blendFunc(gl.ONE,gl.ONE);
//        
//        this.xform.model.push();
//        this.models.update();
//        
//        this.models.draw(gl,this);
//        this.xform.model.pop();
//
//        gl.disable(gl.VERTEX_PROGRAM_POINT_SIZE);
//        gl.disable(gl.BLEND);

          for(var i in this.models.psystem.particles){
              var p = this.models.psystem.particles[i];
              this.xform.model.push();
              this.xform.model.loadIdentity();
              this.xform.model.translate(p.x,p.y,p.z);
              this.xform.model.scale(0.1,0.1,0.1);
              this.drawCube(gl,p.x,p.y,p.z);
              this.xform.model.pop();
          }  
          
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


        //this.xform.model.loadIdentity();
        if (this.tex.isValid) {
                var quadUniforms = { u_mvp : this.xform.modelViewProjectionMatrix };
                var quadSamplers = { s_texture : this.tex };
                sglRenderMeshGLPrimitives(this.quadMesh, "tristrip", this.texProg, null, quadUniforms, quadSamplers);
        }



//        gl.enable(gl.VERTEX_PROGRAM_POINT_SIZE);
//        gl.enable(gl.BLEND);
//        gl.blendFunc(gl.ONE,gl.ONE);
//
//        var pMesh = new SglMeshGL(gl);
//        pMesh.primitives = "vertices";
//        pMesh.addVertexAttribute("position",3,new Float32Array([0,0,0]));
//        pMesh.addVertexAttribute("color",3,new Float32Array([1,0,0]));
//        pMesh.addArrayPrimitives(pMesh.primitives, gl.POINTS, 0, 1);
//        sglRenderMeshGLPrimitives(pMesh, pMesh.primitives, this.simpleProg, null, this.uniform);        
//
//        gl.disable(gl.VERTEX_PROGRAM_POINT_SIZE);
//        gl.disable(gl.BLEND);
        
//        gl.enable(gl.DEPTH_TEST);
//        gl.enable(gl.CULL_FACE);
//
//        var boxUniforms = { u_mvp : this.xform.modelViewProjectionMatrix };
//        sglRenderMeshGLPrimitives(this.boxMesh, this.primitives, this.simpleProg, null, boxUniforms);
//
//
//        gl.disable(gl.DEPTH_TEST);
//        gl.disable(gl.CULL_FACE);
    },
    
    drawRelation: function(gl,r) {
        r.draw(gl,this);
    }
    
}; 