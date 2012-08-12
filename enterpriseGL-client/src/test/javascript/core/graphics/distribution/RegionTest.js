describe('Region Testing', function(){
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
    
    describe('Testing construtor', function(){
        var r = new Region(); 
        r.init(0,0,0);       
        it('Control number of childs', function(){
            expect(r.childs.length).toBe(0);
        });
       
    });
    
    describe('insert() Test', function(){
        var r1 = new Region(); r1.init(20,20,20);
        r1.insert(p[0]);
        var r = new Region(); r.init(10,10,10);
        r.range = 100;
        r.insert(p[0]); // point in the region 7
        r.insert(p[1]); // point in the region 0
        
        it('Control number of childs', function(){
           expect(r1.childs.length).toBe(1);
           expect(r.childs.length).toBe(2);
        });        
    });
    
    describe("contains() Testing", function(){
       var r = new Region(), result;
       r.init(20,20,20); r.range = 20; 
       
       it("Control if (-1,-1,-1) is not in the region", function(){
          result = r.contains({position: new THREE.Vector3(-1,-1,-1)}); 
          expect(result).toBe(false);
       });

       it("Control if (41,41,41) is not in the region", function(){
          result = r.contains({position: new THREE.Vector3(41,41,41)}); 
          expect(result).toBe(false);
       });

       it("Control if (39,39,1) is in the region", function(){
          result = r.contains({position: new THREE.Vector3(39,39,1)}); 
          expect(result).toBe(true);
       });
    });
    
    describe("computeCentreOfMass() Testing", function(){
       var r = new Region(); r.init(20,20,20);
       r.range = 20;
       //r.insert(p[0]);
       for(var i in p) r.insert(p[i]);
       r.computeCenterOfMass();
       
       it("Control if centreOfMass assign correct mass value", function(){
           expect(r.getMass()).toBe(14);
       })
       
       it("Control if position of centreOfMass is correct", function(){
          expect(r.position.x).toBe(10.5); 
          expect(r.position.y).toBe(10.5); 
          expect(r.position.z).toBe(10); 
       });
    });
       
});