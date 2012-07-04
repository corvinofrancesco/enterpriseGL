describe("RelationBuilderTest",function(){
    var rBuilder = new RelationBuilder();
    var rType = new Relation();
    rBuilder.setGeometry(rType.geometry());
    rBuilder.setGenerator(rType.generator);
    rBuilder.setProperties({});
    var p1 = {x:0,y:1,z:3};
    var r = rBuilder.build(p1,{x:0,y:1,z:3});
   
    it("Control r position", function(){
        expect(r.position.x).toBe(p1.x);
        expect(r.position.y).toBe(p1.y);
        expect(r.position.z).toBe(p1.z);       
    });
    
})