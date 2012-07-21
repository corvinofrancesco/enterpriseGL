function RegionLeaf(){
    this.parent = null;
    this.position = new THREE.Vector3(0,0,0);
}

RegionLeaf.prototype = {
    /**
     * This method is called from Distribution Algoritms
     * @param r RegionLeaf to control position
     * @return true if the distance between r and this is the same
     */
    samePosition: function(r){
        
    },
    
    /**
     * 
     * @param r RegionLeaf to merge with this
     * @return union region
     */
    unionWith: function(r){
        
    }
    
}