describe('DistributionGraph Test', function(){
    var p = [
        {position: new THREE.Vector3(15,15,15), barneshut: {}, getMass:function(){return 1;}},
        {position: new THREE.Vector3( 8, 8, 8), barneshut: {}, getMass:function(){return 1;}},
        {position: new THREE.Vector3(12, 8, 8), barneshut: {}, getMass:function(){return 4;}},
        {position: new THREE.Vector3( 8,12, 8), barneshut: {}, getMass:function(){return 4;}},
        {position: new THREE.Vector3(12,12, 8), barneshut: {}, getMass:function(){return 1;}},
        {position: new THREE.Vector3( 8, 8,12), barneshut: {}, getMass:function(){return 1;}},
        {position: new THREE.Vector3(12,12,16), barneshut: {}, getMass:function(){return 1;}},
        {position: new THREE.Vector3(12,12,17), barneshut: {}, getMass:function(){return 1;}}
    ];
    
    describe('insert() Test', function(){
        var graph = new DistributionGraph();
        for(var elec in graph.prototype) alert(elec);
        graph.insert(p[0]);
        
        it('Control number of childs', function(){
           expect(graph.root().childs.length).toBe(1);
        });
        
        it('Control stop of recursion with have same position', function(){
            var graph = new DistributionGraph();
            var error = false;
            try {
                graph.insert(p[0]);
            } catch(e){error=e;};
            expect(error).toBe(false);
        });
    });
    
    describe("createSubRegion() Testing",function(){
        var r = new Region(20,20,20);
        r.range = 20;
        
        it("Control sub region correct centre values ", function(){
            var regionI = 0;
            // set child to exchange
            r.childs[regionI] = p[1];
            // call subRegion
            r.createSubRegion(regionI,p[0]);
            // control result
            var result = r.childs[regionI].centre;
            expect(result.subSelf({x:10,y:10,z:10}).lengthSq()).toBe(0);
        });
        
    });
    
});