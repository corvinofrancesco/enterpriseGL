EntGLTest.DistributionAlgTest = function(){
    this.className = "DistributionAlgTest";
    this.points = [];
    this.particles = {};
}

EntGLTest.DistributionAlgTest.prototype = new EntGLTest();
EntGLTest.DistributionAlgTest.constructor = EntGLTest.DistributionAlgTest;
EntGLTest.DistributionAlgTest.superclass = EntGLTest;

EntGLTest.DistributionAlgTest.prototype.setPoints = function(points){
    this.points = points || [];
}

EntGLTest.DistributionAlgTest.prototype.setOrigin = function(origin){
    this.origin = origin;
    this.particles["0"] = origin;
}

EntGLTest.DistributionAlgTest.prototype.setNextOrigin = function(nextO){
    this.nextOrigin = nextO;
    this.particles["N"] = nextO;
}

EntGLTest.DistributionAlgTest.prototype.setOtherPoint = function(point){
    this.otherPoint = point;
    this.particles["P"] = point;
}

EntGLTest.DistributionAlgTest.prototype.setMiddle = function(middle){
    this.middle= middle;
    this.particles["M"] = middle;
}

EntGLTest.DistributionAlgTest.prototype.testGetPositionFor = function(){
    var alg = new DistributionAlg(),
        v = alg.getPositionFor(),
        part1 = {
            position : new THREE.Vector3(0,0,0),
            modelReference: 'part1'
        };
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.z).toBe(0);
    alg.insert(part1);
    v = alg.getPositionFor('part1'); 
    expect(v).not.toBe(null);    
}

EntGLTest.DistributionAlgTest.prototype.testInsert = function(){
    var alg = new DistributionAlg(),
        origin = this.origin, 
        particles = this.particles;
    alg._getInfoFor = function(p){return particles[p];};
    alg.insert(origin);

    expect(alg._leaves.length>0).toBe(true);

    var result = alg._search(origin);
    expect(result instanceof RegionLeaf).toBe(true);
    expect(result.have(origin)).toBe(true);
    expect(result.parent).toBe(alg._root);
}    
    
EntGLTest.DistributionAlgTest.prototype.testUpdate = function(){
    var alg = new DistributionAlg();
    alg.reset();
    alg.update(this);

    var result = alg._search(this.otherPoint);
    expect(result).not.toBe(null);
}    