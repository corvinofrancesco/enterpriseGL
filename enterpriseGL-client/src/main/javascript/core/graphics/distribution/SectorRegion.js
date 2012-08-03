EntGL.SectorRegion.prototype = new Region(0,0,0)
EntGL.SectorRegion.constructor = EntGl.SectorRegion;
EntGL.SectorRegion.superclass = Region.prototype

EntGL.SectorRegion = function(){
    
}

EntGL.SectorRegion.prototype.init = function(quadrant,l1,l2){
    this.index = quadrant;
    this.limitInf = Math.min(l1, l2);
    this.limitSup = Math.max(l1, l2);
}