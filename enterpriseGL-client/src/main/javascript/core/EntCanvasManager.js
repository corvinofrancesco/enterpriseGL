/**
 * Class used to load the enviroment: shaders, canvas 
 */
var z = 8;
function EntCanvasManager(){
    this.idCanvas = "SGL_CANVAS1";
    // TODO initialize the model
    this.models = new EntGraphics();
    this.running = false;
    
}
 
EntCanvasManager.prototype = {
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
        
        this.models.load(gl);
        
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
          
          //this.xform.model.translate(p.x,p.y,p.z);
          //this.xform.model.scale(0.1,0.1,0.1);
          this.models.primitives.starParticles.draw(gl,this,p);
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
        
    drawRelation: function(gl,r) {
        r.draw(gl,this);
    }
    
}; 
