function EnvModel(){
    this.idCanvas = "SGL_CANVAS1";
    this.idVertexShader = "SIMPLE_VERTEX_SHADER";
    this.idFragmentShader = "SIMPLE_FRAGMENT_SHADER";   
    // TODO initialize the model
    this.models = new EntGraphics();
    
}
 
EnvModel.prototype = {
        setup: function(idCanvas, idVSh, idFSh){
            // control attributes initialisation
            if(idCanvas) this.idCanvas = idCanvas;
            if(idVSh) this.idVertexShader = idVSh;
            if(idFSh) this.idFragmentShader = idFSh;
            // start particles system
            this.modelLoader.createPart(this.psystem, 5);
            this.modelLoader.createRel(this.psystem, 5);
            
            // register Canvas
            sglRegisterCanvas(this.idCanvas, this, 60.0);                
        },
        
	load : function(gl){
		/*************************************************************/
		// roughly install GL_POINT_SIZE on the gl context
		gl.VERTEX_PROGRAM_POINT_SIZE = 0x8642;
		/*************************************************************/

                /*************************************************************/
 		this.xform = new SglTransformStack(); 
		this.timeShader = 0.0;
		this.angle = 0.0;                
                this.rotation = false;
		/*************************************************************/
 
		/*************************************************************/
		var simpleVsrc = sglNodeText(this.idVertexShader); 
		var simpleFsrc = sglNodeText(this.idFragmentShader); 
		var simpleProg = new SglProgram(gl, [simpleVsrc], [simpleFsrc]); 
		this.simpleProg = simpleProg;
		/*************************************************************/
 
		/*************************************************************/ 
                // load particles primitives
                this.models.load();

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
                            this.psystem.updatePosition();
                            this.particleSys.removeVertexAttribute("position"); 
                               var positions = new Float32Array(this.psystem.particlesVertex());
                               this.particleSys.addVertexAttribute("position", 3, positions);  
                            break;
			default : break;
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
		gl.clearColor(0.0, 0.0, 1.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
		gl.viewport(0, 0, w, h);
		this.xform.projection.loadIdentity();
		this.xform.projection.perspective(sglDegToRad(60.0), w/h, 0.1, 100.0);
		this.xform.view.loadIdentity();
		this.xform.view.lookAt(0.0, 2.0, 3.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
		this.xform.model.loadIdentity();
		this.xform.model.rotate(sglDegToRad(this.angle), 0.0, 1.0, 0.0);
		this.xform.model.scale(1.5, 1.5, 1.5);

                //gl.enable(gl.VERTEX_PROGRAM_POINT_SIZE);
		//gl.enable(gl.BLEND);
		//gl.blendFunc(gl.ONE,gl.ONE);
		gl.enable(gl.DEPTH_TEST);
		//gl.enable(gl.CULL_FACE);

                var pSysUniforms = { u_mvp : this.xform.modelViewProjectionMatrix , timeShader: this.timeShader};
		sglRenderMeshGLPrimitives(this.particleSys, "vertices", this.simpleProg, null, pSysUniforms);
                sglRenderMeshGLPrimitives(this.particleSys, "edges", this.simpleProg, null, pSysUniforms);
                
                //gl.disable(gl.VERTEX_PROGRAM_POINT_SIZE);
		//gl.disable(gl.BLEND);
		gl.disable(gl.DEPTH_TEST);
		//gl.disable(gl.CULL_FACE);
	}
}; 