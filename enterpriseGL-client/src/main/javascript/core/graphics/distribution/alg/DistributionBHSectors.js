EntGL.DistributionBHSectors = function(){
    this._root = new Region(0,0,0);
    this._root.type = "spherical";
    this._regions = [this._root];
    this._leaves = [];
}

EntGL.DistributionBHSectors.prototype = new DistributionAlg();
EntGL.DistributionBHSectors.constructor = EntGL.DistributionBHSectors;
EntGL.DistributionBHSectors.superclass = DistributionAlg.prototype;

/**
 * Method to reset initial status of algorithm
 */
EntGL.DistributionBHSectors.prototype.reset = function(){
    this._root = new SectorRegion();
    this._root.type = "spherical";
    this._regions = [this._root];
    this._leaves = [];
}

/**
 * Insert a graphical particle in the distribution
 * @param p Graphical Particle
 * @return RegionLeaf where the particle is going to be insert
 */
EntGL.DistributionBHSectors.prototype.insert = function(p){
    if(!(p.position instanceof THREE.Vector3)) {
        p.position = this.getPositionFor(p);
    }
    // update root dimension
    if(!this._root.contains(p)) this._root.range = p.position.length() + 10;
    var r = new RegionLeaf(p); //this.createLeafRegion(p);
    this._insert(r);
    return r;
}