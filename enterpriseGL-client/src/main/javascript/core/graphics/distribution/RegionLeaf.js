function RegionLeaf(p){
    var point = p || {position:null,modelReference:null};
    this.parent = null;
    this.position = point.position || new THREE.Vector3(0,0,0);
    this._container = point.modelReference?[point.modelReference]:[];
    this.error = 0.009;
    this.mass = 0;
}

RegionLeaf.prototype = {
    
    getMass: function(){
        return this.mass;
    },
    
    getOrigin: function(){
      return this._container;  
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
        var cont,pos;
        if(r instanceof RegionLeaf){
            cont = r._container; pos = r.position;
        } else { 
            cont = r.modelReference;
            pos = r.position;
            if(cont==null || cont==undefined) return;
            cont = [cont];
        }
        this._container = this._container.concat(cont);
        // calculate the mean position
        this.position.addSelf(pos).multiplyScalar(0.5);        
        this.mass++;            
    },
    
    /**
     * 
     * @param p graphical particle to control
     * @return true if the region contains only the passed particle
     */
    isOnlyFor: function(p){
        if(this._container.length>1) return false;
        if(this._container[0] == p.modelReference) return true;
        return false;
    },
    
    /**
     *
     * @param p graphical particle, EntParticle or identificator of the particle to control
     * @return true if the region contains the passed particle
     */
    have: function(p){
        var id = p.modelReference || p;
        if(p instanceof EntParticle) id = p.id;
        for(var e in this._container){
            if(this._container[e]== id) 
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
        for(var e in this._container){
            if(this._container[e]== p.modelReference){
                this._container.splice(e,1);
                return true;                
            } 
        }
        return false;        
    },
    
    isEmpty: function(){
        if(this._container.length==0) return true;
        return false;
    },

    update: function(points){        
        this.position = new THREE.Vector3(0,0,0);
        if(points.length==0) return;
        var pointNum = 0;
        for(var i in points){
            if(!this.have(points[i])) continue;
            this.position.addSelf(points[i].position);
            pointNum ++;
        }
        if(pointNum>1) this.position.multiplyScalar(1/points.length);
    },
    
    toString: function(){
        var str = "{type:leaf, ";
        str += "p: [" + [this.position.x,this.position.y,this.position.z] + "],";
        str += "elem: [" + this.getOrigin() + "]}";
        return str;
    }
    
}