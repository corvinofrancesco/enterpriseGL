describe('Testing particles system', function(){
    var sys = new ParticleSystem();
    sys.particles[0] = new Particle("0").move(10,2,5);
    sys.particles[1] = new Particle("1").move(2,3,5);
    var numPar = sys.size();
    
    describe('Verify system management of particles', function(){
        var vertices = sys.particlesVertex();
        
        it('Control if function returns valid array vertices', function(){
            expect(vertices instanceof Array).toBe(true);
        });

        it('Control if number of vertex matrix is equal to 3 * num of particles created',function(){
            expect(vertices.length).toBe(numPar*3);
        });
      
    });
        
});