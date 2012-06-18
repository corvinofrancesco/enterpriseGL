describe('Testing di envLoader',function(){
	
	var canvasId = 'SGL_CANVAS1';
        var vsId = 'SIMPLE_VERTEX_SHADER',fsId='SIMPLE_FRAGMENT_SHADER';
        var vsCode = 
            "#ifdef GL_ES\n" +
            "precision highp float;\n" +
            "#endif\n" +
            "uniform   mat4 u_mvp;\n" + 
            "attribute vec3 a_position;\n" + 
            "attribute vec3 a_color;\n" +
            "varying   vec3 v_color;\n" +
            "void main(void)\n" + 
            "{\n" +
            "	v_color    = a_color;\n" + 
            "   gl_Position = u_mvp * vec4(a_position, 1.0);\n"+            
            "}";
	
        afterEach(function(){
            
        });
        
        it('try to create EnvModel', function(){
            var thrown = false;            
            try {
                var env = new EnvModel(canvasId);                
            } catch(e){
                thrown = e;                
            }
            expect(thrown).toBe(false);                        
        });
                
        describe('Creating Canvas elements',function(){

            //Create an easily-removed container for our tests to play in
            beforeEach(function() {

                var container = document.createElement('canvas');
                container.setAttribute('id',canvasId);		
                document.body.appendChild(container);
                var vs = document.createElement('script');
                vs.setAttribute("id", vsId);
                vs.setAttribute('type', "text/x-vertex")
                document.body.appendChild(vs);
                //$(vsId).innerHTML = vsCode;
                var fs = document.createElement('script');
                fs.setAttribute("id", fsId);
                fs.setAttribute('type', "text/x-fragment")
                document.body.appendChild(fs);

            });
            
            afterEach(function(){
		var container = document.getElementById(canvasId);
		container.parentNode.removeChild(container);
		 container = document.getElementById(vsId);
		container.parentNode.removeChild(container);
		 container = document.getElementById(fsId);
		container.parentNode.removeChild(container);
                
            });
            
            it('try to inizialize EnvLoader', function(){
                var thrown = false;            
                try {
                    var env = new EnvLoader(canvasId);                
                } catch(e){
                    thrown = e;                
                }
                expect(thrown).toBe(false);            
            });

            it('running EnvLoader', function(){
               var env = new EnvLoader(canvasId);

            });

        });
        
});