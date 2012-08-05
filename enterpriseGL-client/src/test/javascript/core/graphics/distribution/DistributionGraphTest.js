EntGLTest.DistributionGraphTest = function(){
    this.className = "DistributionGraph";
    this.points = [];
    this.particles = {};
}

EntGLTest.DistributionGraphTest.prototype = new EntGLTest();
EntGLTest.DistributionGraphTest.constructor = EntGLTest.DistributionGraphTest;
EntGLTest.DistributionGraphTest.superclass = EntGLTest;

EntGLTest.DistributionGraphTest.prototype.setPoints = function(points){
    this.points = points || [];
}

EntGLTest.DistributionGraphTest.prototype.setOrigin = function(origin){
    this.origin = origin;
    this.particles["0"] = origin;
}

EntGLTest.DistributionGraphTest.prototype.setNextOrigin = function(nextO){
    this.nextOrigin = nextO;
    this.particles["N"] = nextO;
}

EntGLTest.DistributionGraphTest.prototype.setOtherPoint = function(point){
    this.otherPoint = point;
    this.particles["P"] = point;
}

EntGLTest.DistributionGraphTest.prototype.setMiddle = function(middle){
    this.middle= middle;
    this.particles["M"] = middle;
}

EntGLTest.DistributionGraphTest.prototype.testInsert = function(){
    var p = this.points,
        graph = new DistributionGraph();

    graph.reset();
    graph.insert(p[0]);

    expect(graph._leaves.length).toBe(1);

    var error = false;
    try {
        graph.insert(p[0]);
    } catch(e){error=e;};
    expect(error).toBe(false);    
}

EntGLTest.DistributionGraphTest.prototype.testGetPositionFor = function(){
   var graph = new DistributionGraph(), 
        particles = this.particles,
        origin = this.origin, 
        nextOrigin = this.nextOrigin;
   graph._getInfoFor = function(p){return particles[p];};
   graph.reset();
   
   var point = graph.getPositionFor({relations:[]});
   expect(point.x).toBe(0);
   expect(point.y).toBe(0);
   expect(point.z).toBe(0);

   graph.insert(origin);
   var t =  graph.getPositionFor({relations:[]});
   expect(t.x).not.toBe(0);
   expect(t.y).not.toBe(0);
   expect(t.z).not.toBe(0);               

   graph.reset();
   graph.insert(origin);
   var v = graph.getPositionFor(nextOrigin);
   expect(v.x).not.toBe(origin.position.x);
   expect(v.y).not.toBe(origin.position.y);
   expect(v.z).not.toBe(origin.position.z);                                             
}

describe('DistributionGraph Test', function(){
    
//    describe("createRegion() Testing",function(){
//        var graph = new DistributionGraph();
//        var r = new RegionLeaf(); 
//        r.position.set(20,20,20);
//        
//        it("Control sub region correct centre values ", function(){
//            // call createRegion
//            var resultReg = graph.createRegion(r);
//            // control result
//            expect(resultReg.parent).toBe(graph._root);
//            expect(resultReg.childs.length>0).toBe(true);
//        });
//        
//    });
//    
    describe("testing distribution", function(){
//        var graph = new DistributionGraph(), sysmock = {};
//        graph.reset();
//        for(var i in p) sysmock[p[i].modelReference] = p[i];
//        graph._getInfoFor = function(part){return sysmock[part];};
//        for(var i in p) graph.insert(p[i]);
//        
//        it("control if leaf is all and with correct configurations", function(){
//            expect(graph._leaves.length).toBe(8);
//            for(var i in graph._leaves){
//                var examLeaf = graph._leaves[i];
//                expect(examLeaf.parent).not.toBe(null);                
//                examLeaf.getOrigin().forEach(function(elem){
//                    var examP = graph._getInfoFor(elem);
//                    expect(graph._search(examP)).not.toBe(null);
//                });
//            }
//        });
//        
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