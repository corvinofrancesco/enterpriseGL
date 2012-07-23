describe("RegionLeaf Test", function(){
    describe("constructor and setter properties testing", function(){
        
        it("test empty constructor",function(){
            var r = new RegionLeaf();
            expect(r.position.x).toBe(0);
            expect(r.position.y).toBe(0);
            expect(r.position.z).toBe(0);
            expect(r._container.length).toBe(0);
            expect(r.parent).toBe(null);
        });
        
        it("test constructor with point",function(){
            var r = new RegionLeaf({
                position: new THREE.Vector3(34,1.4,3),
                modelReference: "test"
            });
            expect(r.position.x).toBe(34);
            expect(r.position.y).toBe(1.4);
            expect(r.position.z).toBe(3);
            expect(r._container[0]).toBe("test");
            expect(r.parent).toBe(null);            
        });
    });
    
    describe("properties testing", function(){
        it("testing isEmpty()", function(){
            var leaf = new RegionLeaf();
            expect(leaf.isEmpty()).toBe(true);
            leaf.unionWith({position:new THREE.Vector3(1,1,1),modelReference:"test"});
            expect(leaf.isEmpty()).toBe(false);
        });
        
    })
});