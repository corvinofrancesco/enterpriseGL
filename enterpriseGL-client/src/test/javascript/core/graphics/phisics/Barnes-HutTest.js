describe('BarnesHut Testing',function(){
		
        afterEach(function(){
            
        });
        
        beforeEach(function() {

        });
        
        describe("insert() test", function(){
            var b = new BarnesHut();
            it("Control if exclude elements without position atribute", function(){
               expect(b.insert({prova: "element"})).toBe(false);
            });
            
            it("Control if adding attribute correctly", function(){
               var p = {
                   position: new THREE.Vector3(0,0,0)
               };
               b.insert(p); 
               expect(p.barneshut).not.toBe(undefined);
               expect(p.getMass()).toBe(1);
            });
            
            it("Control positive result of call to method",function(){
               var p = {
                   position: new THREE.Vector3(1,1,0)
               };
               expect(b.insert(p)).toBe(true);
                
            });
        });
        
        describe("remove() test", function(){
           var b = new BarnesHut();
           var p = {position: new THREE.Vector3(0,0,0)},
               q = {position: new THREE.Vector3(10,0,0)};
           b.insert(p);b.insert(q);
           
           it("Control positive result of call to method",function(){
               expect(b.remove(p)).toBe(true);
           });
          
        });
        
        
        describe("update() test", function(){
            var b = new BarnesHut();
           var p = {position: new THREE.Vector3(0,0,0)},
               q = {position: new THREE.Vector3(10,0,0)},
               t = {position: new THREE.Vector3(10,1,0)};
           b.insert(p);b.insert(q);b.insert(t);
           
           it("Control p position",function(){
               var result = p.barneshut.region.index;
               expect(result).toBe(0);
           });
           
           it("Move p to another region",function(){
               p.position.addSelf(40,40,40);
               b.update();
               var result = p.barneshut.region.index;
               expect(result).toBe(0);               
           });
        })
        
        describe("getForceFor() test", function(){
           var b = new BarnesHut();
           var p = {position: new THREE.Vector3(0,0,0)},
               q = {position: new THREE.Vector3(10,0,0)},
               t = {position: new THREE.Vector3(10,1,0)};
           b.insert(p);b.insert(q);
           b.update();
           it("Control acceleration between two point", function(){
               var a = b.getForceFor(p);
               expect(a.length()<0.1).toBe(true);
           });
           
        });                
});