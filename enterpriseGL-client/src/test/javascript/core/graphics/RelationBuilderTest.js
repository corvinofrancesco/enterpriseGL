describe("Try to create a relation",function(){
    var rBuilder = new RelationBuilder();
    var rType = new Relation();
    rBuilder.setGeometry(rType.geometry());
    rBuilder.setGenerator(rType.generator);
    rBuilder.setProperties({});
    var r = rBuilder.build({x:0,y:1,z:3},{x:0,y:1,z:3});
   
    it("Control if r is Valid Object", function(){
        expect(r.value).toBe("a");
    });
    
})