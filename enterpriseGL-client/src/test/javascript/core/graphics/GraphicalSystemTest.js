describe('Testing particles system', function(){
    var sys = new GraphicalSystem();
    sys.particles[0] = new Particle("0").move(10,2,5);
    sys.particles[1] = new Particle("1").move(2,3,5);
    var numPar = sys.size();
    
    describe('Verify system management of particles', function(){
//        var vertices = sys.particlesVertex();
//        
//        it('Control if function returns valid array vertices', function(){
//            expect(vertices instanceof Array).toBe(true);
//        });
//
//        it('Control if number of vertex matrix is equal to 3 * num of particles created',function(){
//            expect(vertices.length).toBe(numPar*3);
//        });
//            
    });
    
    describe('Control system update method', function(){
        var a = {x:1.0,y:0,z:2.0};
        sys.particles[0].accelerations = a;
        
        var f = function(x,a,v,t){
            return x + a*t*t*0.5 + v*t;
        };
        
        it('Control update afther 1 s', function(){
           var pres = {
               x: f(sys.particles[0].x,a.x,sys.particles[0].velocity.x,1),
               y: f(sys.particles[0].y,a.y,sys.particles[0].velocity.y,1),
               z: f(sys.particles[0].z,a.z,sys.particles[0].velocity.z,1)
           };
           sys.updatePosition(1);
           
           expect(sys.particles[0].x).toBe(pres.x);
           expect(sys.particles[0].y).toBe(pres.y);
           expect(sys.particles[0].z).toBe(pres.z);
        });
        
    });
        
});