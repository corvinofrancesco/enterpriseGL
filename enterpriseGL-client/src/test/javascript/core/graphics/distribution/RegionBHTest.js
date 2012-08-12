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

EntGLTest.RegionBHTest.prototype.testNeedSubdivision = function(){
    var region = new EntGL.RegionBH(),
        point = new RegionLeaf(), i;
    region.init(0,0,0);
    region.range = 50;
        
    for(i =0;i<20;i++) region.insert(point);    
    expect(region.needSubdivision()).toBe(false);
    for(i=0;i<20;i++) {
        point = new RegionLeaf({position: new THREE.Vector3(
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            Math.random() * 100 - 50            
        )});
        region.insert(point);
    }
    expect(region.needSubdivision()).toBe(true);
}

