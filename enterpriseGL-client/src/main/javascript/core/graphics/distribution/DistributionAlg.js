function DistributionAlg(){
    this._root = new Region(0,0,0);
    this._root.range = 100;
    this._regions = [this._root];
    this._leaves = [];
}

DistributionAlg.prototype = {
    
    /**
     * Remove internal region-regionleaf
     * @param region region to be removed
     */
    _remove: function(region){
        var remArray = [];
        if(region instanceof Region){
            remArray = this._regions
        }  else if(region instanceof RegionLeaf){
            remArray = this._leaves;
        }
        if(region.parent!=null) {
            region.parent.remove(region);
        }
        for(var i in remArray){
            if(remArray[i] == child) {
                this.childs[i] = undefined;
                return;
            }
        }
    },
    
    /**
     * This function must return a position for a particle
     * @param p is a graphical particle 
     */
    getPositionFor: function(p){
        return new THREE.Vector3(0,0,0);
    },
    
    update: function(){
        var q = [this.root], exitQueque = [];
        while(q.length>0){
            var node = q.shift();
            if(node instanceof Region){
                node.computeCenterOfMass();
                q.push(node.childs);
            } else if(node instanceof RegionLeaf){
                var r = node.parent;
                if(r!=null) if(!r.contains(node)) {
                    exitQueque.push(node);
                    if(r.parent){
                        r.parent.reinsert(node,r)
                    }
                }
            }
        }        
    },
    
    insert: function(p){
        var r, suggestedLeaf = null;
        if(!(p.position instanceof THREE.Vector3)) {
            p.position = this.getPositionFor(p);
        }
        if(!this._root.contains(p)) {
            this._root.resize(p.position.length() + 50);
            // TODO update all the regions
        }
        r = this.createLeafRegion(p);
        if(this._leaves.length>0){
            // search leaf with same position
            var minLen = 2000, minLeaf = 0;
            if(this._leaves.length > 1 ) for(var l in this._leaves){
                var curr = this._leaves[l];
                var currLen = curr.position.clone().subSelf(p.position).lengthSq();
                if(currLen<minLen){ minLen = currLen; minLeaf = l;}    
            }
            suggestedLeaf = this._leaves[minLeaf];
            if(this._leaves[minLeaf].samePosition(r)){
                return suggestedLeaf.unionWith(r)
            } 
        }
        // search faillure
        this._leaves.push(r);
        var promotions = this._searchPromotions(r,suggestedLeaf);
        if(promotions.length>0){
            for(var i in promotions){
                this._remove(promotions[i]);
                if(promotions[i] instanceof RegionLeaf){
                    var newReg = this.createRegion(promotions[i]);
                    if(newReg.parent!=null) newReg.parent.insert(newReg);
                    this._regions.push(newReg);
                }
            }
        }
        return r;
    },
    
    remove: function(p){
        
    },
    
    reset: function(){
        this._root = new Region(0,0,0);
        this._root.range = 100;
        this._regions = [];
        this._leaves = [];
    },

    root: function(){
        return this._root;
    },
    
    createLeafRegion: function(p){
        var r = new RegionLeaf();
        r.position = p.position;
        return r;
    },
    
    createRegion: function(r){
        
    }
}