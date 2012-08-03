//EntGL.SectorRegion.prototype = new supp()
//EntGL.SectorRegion.constructor = EntGl.SectorRegion;
//EntGL.SectorRegion.superclass = supp.prototype

EntGL.SectorRegion = function(){
    
}

EntGL.SectorRegion.prototype.init = function(quadrant,l1,l2){
    this.index = quadrant;
    this.limitInf = Math.min(l1, l2);
    this.limitSup = Math.max(l1, l2);
}