function EnvModel(){
    this.idCanvas = "SGL_CANVAS1";
    this.idVertexShader = "SIMPLE_VERTEX_SHADER";
    this.idFragmentShader = "SIMPLE_FRAGMENT_SHADER";
    this.modelLoader = new SimulSystem();
    this.psystem = new ParticleSystem();    
    // TODO initialize the model
    
}
 
EnvModel.prototype = {
        setup: function(idCanvas, idVSh, idFSh, modelLoader, pSystem){
            // control attributes initialisation
            if(idCanvas) this.idCanvas = idCanvas;
            if(idVSh) this.idVertexShader = idVSh;
            if(idFSh) this.idFragmentShader = idFSh;
            // start particles system
            this.modelLoader.createPart(this.psystem, 20);
            this.modelLoader.createRel(this.psystem, 30);
            
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
		/*************************************************************/
 
		/*************************************************************/
		var simpleVsrc = sglNodeText(this.idVertexShader); 
		var simpleFsrc = sglNodeText(this.idFragmentShader); 
		var simpleProg = new SglProgram(gl, [simpleVsrc], [simpleFsrc]); 
		this.simpleProg = simpleProg;
		/*************************************************************/
 
		/*************************************************************/ 
                var positions = new Float32Array(this.psystem.particlesVertex());
                var edgesIndices = new Uint16Array(this.psystem.particlesEdges());
                // TODO get the inizialized forces (directions, velocities and accelerations)
                var directions = new Float32Array(this.psystem.particlesDirections());
                var velocities = new Float32Array(this.psystem.particlesVelocities());
                var accelerations = new Float32Array(this.psystem.particlesAccelerations());
                var particleSys = new SglMeshGL(gl);
                    particleSys.addVertexAttribute("position", 3, positions);
                    particleSys.addVertexAttribute("direction", 3, directions);
                    particleSys.addVertexAttribute("velocity", 3, velocities);
                    particleSys.addVertexAttribute("acceleration", 3, accelerations);
                    particleSys.addArrayPrimitives("vertices", gl.POINTS, 0, this.psystem.size());
                    particleSys.addIndexedPrimitives("edges", gl.LINES, edgesIndices);
                    particleSys.primitives = "vertices";
                    this.particleSys = particleSys;
                
		/*************************************************************/
	},
 
	keyPress : function(gl, keyCode, keyString) {
		switch (keyString) {
			case "1": this.primitives = "triangles"; break;
 			case "2": this.primitives = "edges"; break;
			case "3": this.primitives = "vertices"; break;
			default : break;
	 	}
	},
 
	update : function(gl, dt) {
		this.angle += 90.0 * dt;
                this.timeShader += 0.50 * dt; 
                if(this.timeShader>4) this.timeShader=0.0;	        
	},
 
	draw : function(gl){
		var w = this.ui.width;
		var h = this.ui.height;
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
		gl.viewport(0, 0, w, h);
		this.xform.projection.loadIdentity();
		this.xform.projection.perspective(sglDegToRad(60.0), w/h, 0.1, 100.0);
		this.xform.view.loadIdentity();
		this.xform.view.lookAt(0.0, 2.0, 3.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
		this.xform.model.loadIdentity();
		this.xform.model.rotate(sglDegToRad(this.angle), 0.0, 1.0, 0.0);
		this.xform.model.scale(1.5, 1.5, 1.5);

                gl.enable(gl.VERTEX_PROGRAM_POINT_SIZE);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.ONE,gl.ONE);
		//gl.enable(gl.DEPTH_TEST);
		//gl.enable(gl.CULL_FACE);
		var pSysUniforms = { u_mvp : this.xform.modelViewProjectionMatrix , timeShader: this.timeShader};
		sglRenderMeshGLPrimitives(this.particleSys, "vertices", this.simpleProg, null, pSysUniforms);
                sglRenderMeshGLPrimitives(this.particleSys, "edges", this.simpleProg, null, pSysUniforms);
                gl.disable(gl.VERTEX_PROGRAM_POINT_SIZE);
		gl.disable(gl.BLEND);
		//gl.disable(gl.DEPTH_TEST);
		//gl.disable(gl.CULL_FACE);
	}
}; 