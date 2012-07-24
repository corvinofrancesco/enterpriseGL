describe('DistributionGraph Test', function(){
    var p = [
        {position: new THREE.Vector3(15,15,15), relations: [], modelReference:"part1"},
        {position: new THREE.Vector3( 8, 8, 8), relations: ["part1"], modelReference:"part2"},
        {position: new THREE.Vector3(12, 8, 8), relations: ["part1"], modelReference:"part3"},
        {position: new THREE.Vector3( 8,12, 8), relations: ["part2"], modelReference:"part4"},
        {position: new THREE.Vector3(12,12, 8), relations: ["part2"], modelReference:"part5"},
        {position: new THREE.Vector3( 8, 8,12), relations: ["part2"], modelReference:"part6"},
        {position: new THREE.Vector3(12,12,16), relations: ["part3"], modelReference:"part7"},
        {position: new THREE.Vector3(12,12,16), relations: ["part3"], modelReference:"part9"},
        {position: new THREE.Vector3(12,12,17), relations: ["part3","part2"], modelReference:"part8"}
    ];
    
    describe('insert() Test', function(){
        var graph = new DistributionGraph();
        graph.reset();
        graph.insert(p[0]);
        
        it('Control number of childs', function(){
           expect(graph._leaves.length).toBe(1);
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
    
    describe("createRegion() Testing",function(){
        var graph = new DistributionGraph();
        var r = new RegionLeaf(); 
        r.position.set(20,20,20);
        
        it("Control sub region correct centre values ", function(){
            // call createRegion
            var resultReg = graph.createRegion(r);
            // control result
            expect(resultReg.parent).toBe(graph._root);
            expect(resultReg.childs.length>0).toBe(true);
        });
        
    });
    

    describe("getPositionFor() test", function(){
       var graph = new DistributionGraph();
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
           particles = {"0":origin,"N":nextOrigin,"P":otherPoint,"M":middle};
           graph._getInfoFor = function(p){return particles[p];};
                     
       describe("testing euristicNextPosition", function(){
           var region = new Region(5,5,5),
               leaf = new RegionLeaf(origin);
           var result = graph.euristicNextPosition(leaf,region);
           expect(result instanceof THREE.Vector3).toBe(true);
           var dist = result.lengthSq();
           expect(dist).not.toBe(0);
       });
       
       describe("testing main function getPositionFor",function(){
           graph.reset();
           it("Control if the position free is 0,0,0", function(){
               var point = graph.getPositionFor({relations:[]});
               expect(point.x).toBe(0);
               expect(point.y).toBe(0);
               expect(point.z).toBe(0);
           });

           it("Insert (0,0,0) control new free space", function(){
               graph.insert(origin);
               var t =  graph.getPositionFor({relations:[]});
               expect(t.x).not.toBe(0);
               expect(t.y).not.toBe(0);
               expect(t.z).not.toBe(0);               
           })

           it("Insert point with relations",function(){
               graph.reset();
               graph.insert(origin);
               var v = graph.getPositionFor(nextOrigin);
               expect(v.x).not.toBe(origin.position.x);
               expect(v.y).not.toBe(origin.position.y);
               expect(v.z).not.toBe(origin.position.z);                              

           });
           
       });  
           
    });
    
    describe("testing distribution", function(){
        var graph = new DistributionGraph(), sysmock = {};
        graph.reset();
        for(var i in p) sysmock[p[i].modelReference] = p[i];
        graph._getInfoFor = function(part){return sysmock[part];};
        for(var i in p) graph.insert(p[i]);
        
        it("control if leaf is all and with correct configurations", function(){
            expect(graph._leaves.length).toBe(8);
            for(var i in graph._leaves){
                var examLeaf = graph._leaves[i];
                expect(examLeaf.parent).not.toBe(null);                
                examLeaf.getOrigin().forEach(function(elem){
                    var examP = graph._getInfoFor(elem);
                    expect(graph._search(examP)).not.toBe(null);
                });
            }
        });
        
//        it("control after update",function(){
//            for(var i in p) p[i].position.addSelf(
//                new THREE.Vector3(Math.random()*10,Math.random()*10,Math.random()*10));            
//                
//            expect(graph._leaves.length).toBe(8);
//            
//            graph.update();
//            
//            expect(graph._leaves.length).toBe(9);
//            for(var i in graph._leaves){
//                var examLeaf = graph._leaves[i];
//                expect(examLeaf.parent).not.toBe(null);                
//                examLeaf.getOrigin().forEach(function(elem){
//                    var examP = graph._getInfoFor(elem);
//                    expect(graph._search(examP)).not.toBe(null);
//                });
//            }
//            
//        });
        
    });
    
});