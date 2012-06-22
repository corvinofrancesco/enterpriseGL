describe('Testing simulation', function(){
    var  sSystem = new SimulSystem();
    var sys = new ParticleSystem();
    var numPar = 100, numRel = 120;

    describe('Control particles creation', function(){
        sSystem.createPart(sys,100);

        it('Control number of particles created',function(){
            expect(sys.size()).toBe(numPar);
        });
      
    });
    
    describe('Control relations creation', function(){
       sSystem.createRel(sys,numRel);
       
       it('Control number of relations created', function(){
           expect(sys.relations.length).toBe(numRel);
       })
    });
    
});