function RegionLeaf(){
    this.parent = null;
    this.position = new THREE.Vector3(0,0,0);
    this._conteiner = [];
    this.error = 0.009;
    this.mass = 0;
}

RegionLeaf.prototype = {
    
    getMass: function(){
        return this.mass;
    },
    
    getOrigin: function(){
      return this._conteiner;  
    },
    
    /**
     * This method is called from Distribution Algoritms
     * @param r RegionLeaf to control position
     * @return true if the distance between r and this is the same
     */
    samePosition: function(r){
        var distance = this.position.clone().subSelf(r.position).lengthSq();        
        if(distance<=this.error) return true;
        return false;
    },
    
    /**
     * 
     * @param r RegionLeaf to merge with this
     * @return union region
     */
    unionWith: function(r){
        this._conteiner = this._conteiner.concat(r._conteiner);
        // calculate the mean position
        this.position.addSelf(r.position).multiplyScalar(0.5);        
        this.mass++;
    },
    
    /**
     * 
     * @param p graphical particle to control
     * @return true if the region contains only the passed particle
     */
    isOnlyFor: function(p){
        if(this._conteiner.length>1) return false;
        if(this._conteiner[0] == p.modelReference) return true;
        return false;
    },
    
    /**
     *
     * @param p graphical particle to control
     * @return true if the region contains the passed particle
     */
    have: function(p){
        for(var e in this._conteiner){
            if(this._conteiner[e]== p.modelReference) 
                return true;
        }
        return false;
    },
    
    /**
     * 
     * @param p graphical particle to remove
     * @return true if it removes correctly particle 
     */
    remove: function(p){
        for(var e in this._conteiner){
            if(this._conteiner[e]== p.modelReference){
                this._conteiner.splice(e,1);
                return true;                
            } 
        }
        return false;        
    },
    
    isEmpty: function(){
        if(this._conteiner.length==0) return true;
        return false;
    },

    update: function(points){        
        this.position = new THREE.Vector3(0,0,0);
        if(points.length==0) return;
        for(var i in points){
            this.position.addSelf(points[i].position);
        }
        this.position.multiplyScalar(1/points.length);
    }
    
}