describe('Testing di envLoader',function(){
	
	var canvasId = 'SGL_CANVAS1';
        var vsId = 'SIMPLE_VERTEX_SHADER',fsId='SIMPLE_FRAGMENT_SHADER';
	
        afterEach(function(){
            
        });
        
        it('try to create EnvModel', function(){
            var thrown = false;            
            try {
                var env = new EnvModel();                
            } catch(e){
                thrown = e;                
            }
            expect(thrown).toBe(false);                        
        });
                
});