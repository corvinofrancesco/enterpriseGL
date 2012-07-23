describe("DistributionAlg Test", function(){
   var origin = {
           position: new THREE.Vector3(0,0,0),
           relations: [], modelReference:"0"
       },
       nextOrigin = {
           relations:["0"],modelReference:"N"
       },
       otherPoint = {
           relations:[],modelReference:"P"
       },
       middle = {
           relations:["0","P"],modelReference:"M"
       },
       particles = {"0":origin,"N":nextOrigin,"P":otherPoint,"M":middle},
       getInfoFor = function(p){return particles[p];};
       
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
        var alg = new DistributionAlg();
        alg._getInfoFor = getInfoFor;
        alg.insert(origin);
        
        it("Insert have create almost one leaf",function(){
            expect(alg._leaves.length>0).toBe(true);
        });
        
        it("We can search the leaf created", function(){
            var result = alg._search(origin);
            expect(result instanceof RegionLeaf).toBe(true);
            expect(result.have(origin)).toBe(true);
            expect(result.parent).toBe(alg._root);
        });
        
    });
    
    
});