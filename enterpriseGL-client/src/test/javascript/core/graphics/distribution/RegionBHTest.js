EntGLTest.RegionBHTest = function(){
    this.className = "RegionBH";    
}

EntGLTest.RegionBHTest.prototype = new EntGLTest();
EntGLTest.RegionBHTest.constructor = EntGLTest.RegionBHTest;
EntGLTest.RegionBHTest.superclass = EntGLTest;

EntGLTest.RegionBHTest.prototype.testEuristicNextPosition = function(){
    var region = new RegionBH(5,5,5),
       leaf = new RegionLeaf({
               position: new THREE.Vector3(0,0,0),
               relations: [], modelReference:"0"
           });
    var result = RegionBH.euristicNextPosition(leaf,region);
    expect(result instanceof THREE.Vector3).toBe(true);
    var dist = result.lengthSq();
    expect(dist).not.toBe(0);
    
}