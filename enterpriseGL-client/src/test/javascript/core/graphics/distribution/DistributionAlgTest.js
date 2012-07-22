describe("DistributionAlg Test", function(){

    describe('Testing spacial management methods', function(){
        var alg = new DistributionAlg();
        
        describe('Testing getPositionFor method', function(){

            it('Control if with nothing return 0,0,0 position', function() {
                var v = alg.getPositionFor();
                expect(v.x).toBe(0);
                expect(v.y).toBe(0);
                expect(v.z).toBe(0);
            });
                        
            it('Control if with a particle the result is a valid position', function(){
                var part1 = {
                    position : new THREE.Vector3(0,0,0),
                    modelReference: 'part1'
                };
                alg.insert(part1);
                var v = alg.getPositionFor('part1'); 
                expect(v).not.toBe(null);
            });
                        
        });
    
    });
    
    describe("Management regions methods", function(){
        
    });
    
    
});