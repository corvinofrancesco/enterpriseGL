function EnvModel(){
    this.idVertexShader = "SIMPLE_VERTEX_SHADER";
    this.idFragmentShader = "SIMPLE_FRAGMENT_SHADER";
}
 
EnvModel.prototype = {
	load : function(gl){
		 /*************************************************************/
 		this.xform = new SglTransformStack(); 
		this.angle = 0.0;
		this.primitives = "triangles";
		/*************************************************************/
 
		/*************************************************************/
		var simpleVsrc = sglNodeText(this.idVertexShader); 
		var simpleFsrc = sglNodeText(this.idFragmentShader); 
		var simpleProg = new SglProgram(gl, [simpleVsrc], [simpleFsrc]); 
		this.simpleProg = simpleProg;
		/*************************************************************/
 
		/*************************************************************/ 
                // TODO initialize the model
		//box.addVertexAttribute("position", 3, boxPositions); 
		//box.addVertexAttribute("color", 3, boxColors); 
		//box.addArrayPrimitives("vertices", gl.POINTS, 0, 8); 
		//box.addIndexedPrimitives("triangles", gl.TRIANGLES, boxTrianglesIndices); 
		//box.addIndexedPrimitives("edges", gl.LINES, boxEdgesIndices); 
		//this.boxMesh = box; 
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
	},
 
	draw : function(gl){
		var w = this.ui.width;
		var h = this.ui.height;
		gl.clearColor(0.2, 0.2, 0.6, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
		gl.viewport(0, 0, w, h);
		this.xform.projection.loadIdentity();
		this.xform.projection.perspective(sglDegToRad(60.0), w/h, 0.1, 100.0);
		this.xform.view.loadIdentity();
		this.xform.view.lookAt(0.0, 2.0, 3.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
		this.xform.model.loadIdentity();
		this.xform.model.rotate(sglDegToRad(this.angle), 0.0, 1.0, 0.0);
		this.xform.model.scale(1.5, 1.5, 1.5);
		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);
		var boxUniforms = { u_mvp : this.xform.modelViewProjectionMatrix };
		sglRenderMeshGLPrimitives(this.boxMesh, this.primitives, this.simpleProg, null, boxUniforms);
		gl.disable(gl.DEPTH_TEST);
		gl.disable(gl.CULL_FACE);
	}
}; 
 
function EnvLoader(id){
    sglRegisterCanvas(id, new EnvModel(), 60.0);    
}
