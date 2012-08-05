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
    var region = new RegionBH(5,5,5),
       leaf = new RegionLeaf(this.origin), 
       result, dist;
       region.range = 20;
    result = RegionBH.euristicNextPosition(leaf,region);
    expect(result instanceof THREE.Vector3).toBe(true);
    alert(result.x + "," + result.y + "," + result.z + "-->"+result.lengthSq())
    expect(result.lengthSq()).not.toBe(0);    
}

EntGLTest.RegionBHTest.prototype.testInsert = function(){
    
}

