EntGLTest.RegionBHTest = function(){
    this.className = "RegionBH";    
    this.origin = {
       position: new THREE.Vector3(0,0,0),
       relations: [], modelReference:"0"
    };
}

EntGLTest.RegionBHTest.prototype = new EntGLTest();
EntGLTest.RegionBHTest.constructor = EntGLTest.RegionBHTest;
EntGLTest.RegionBHTest.superclass = EntGLTest;

EntGLTest.RegionBHTest.prototype.setOrigin = function(origin){
    this.origin = origin;
}

EntGLTest.RegionBHTest.prototype.testEuristicNextPosition = function(){
    var region = new EntGL.RegionBH(),
       leaf = new RegionLeaf(this.origin), 
       result;
       region.range = 20;
    region.init(5,5,5);
    result = EntGL.RegionBH.euristicNextPosition(leaf,region);
    expect(result instanceof THREE.Vector3).toBe(true);
    expect(result.lengthSq()).not.toBe(0);    
}

EntGLTest.RegionBHTest.prototype.testInsert = function(){
    expect(true).toBe(true);
}

