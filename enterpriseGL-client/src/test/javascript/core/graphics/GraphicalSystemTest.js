describe('GraphicalSystem Test', function(){
    
    describe('Testing spacial management methods', function(){
        var sys = new GraphicalSystem();
        
        describe('Testing freeSpace method', function(){

            it('Control if with nothing return 0,0,0 position', function() {
                var v = sys.getFreeSpace();
                expect(v.x).toBe(0);
                expect(v.y).toBe(0);
                expect(v.z).toBe(0);
            });
                        
        });
        
        describe('Testing SpaceNextTo method', function(){

            it('Control if with nothing return null ', function() {
                var v = sys.getSpaceNextTo('null');
                expect(v).toBe(null);
            });
            
            it('Control if with a particle the result is a valid position', function(){
               sys.particles['part1'] = {
                   position : new THREE.Vector3(0,0,0),
                   modelReference: 'part1'
               };
               var v = sys.getSpaceNextTo('part1'); 
               expect(v).not.toBe(null);
            });
                        
        });
    
    });
    
    describe('Testing system management of particles', function(){
        var sys = new GraphicalSystem();
        sys.add({
           position : new THREE.Vector3(0,0,0),
           modelReference: 'part1',
           id: 1
        });
        sys.add({
           position : new THREE.Vector3(1,1,0),
           modelReference: 'part2',
           id: 2
        });
        
        describe('Testing findParticle',function(){
            it('Control mismached research',function(){
                var f = sys.findParticle('null');
                expect(f).toBe(null);
            });
            it('Control correct research', function(){
               var f = sys.findParticle('part2');
               expect(f.modelReference).toBe('part2');
            });
        });
        
        it('Testing size method', function(){
            expect(sys.size()).toBe(2);
        });
        
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