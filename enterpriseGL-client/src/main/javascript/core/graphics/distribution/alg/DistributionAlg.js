function DistributionAlg(){
    this._root = new Region(0,0,0);
    this._root.range = 100;
    this._regions = [this._root];
    this._leaves = [];
    this._infoRepository = null;
}

DistributionAlg.prototype = {
    
    setSystemRepos: function(system){ this._infoRepository = system;},
    _getInfoFor: function(id){
        var p = null;
        try{
            p = this._infoRepository.particles[id];
        } catch(e){ return null;}
        return p;
    },
    
    /**
     * Remove internal region-regionleaf
     * @param region region to be removed
     * @return void
     */
    _remove: function(region){
        var remArray = [];
        if(region instanceof Region){
            remArray = this._regions
        } else if(region instanceof RegionLeaf){
            remArray = this._leaves;
        }
        if(region.parent!=null) {
            region.parent.remove(region);
        }
        for(var i in remArray){
            if(remArray[i] == region) {
                remArray.splice(i,1);
                return;
            }
        }
    },
    
    /**
     * @param leaf foglia da aggiornare
     * @param newPoints precedenti punti registrati per la foglia
     */
    _updateLeaf: function(leaf, newPoints){
        alert("update leaf with " + leaf.getOrigin());
        for(var i in newPoints){
            var p = newPoints[i];
            if(leaf.samePosition(p)) continue;
            else if(leaf.isOnlyFor(p)) leaf.update(newPoints);
            else {    
                alert("creo una foglia: " + p.modelReference);
                leaf.remove(p);
                //this.insert(p);
                var newLeaf = this.createLeafRegion(p);                
                this._leaves.push(newLeaf);
                this._insert(newLeaf,leaf.parent);
            }
        }
        if(leaf.isEmpty()) {
            alert("mangio una foglia.."+ leaf.getOrigin());
            this._remove(leaf);        
        }
    },

    _insert: function(leaf, suggestLeaf){
        var q = [this._root], candidateParent = null, curr;
        while(q.length>0){
            curr = q.shift();            
            if(curr instanceof Region) if(curr.contains(leaf)){
                candidateParent = curr;
                for(var c in curr.childs) q.push(c);
            }
        }
        if(candidateParent != null) {
            candidateParent.insert(leaf);
        } else {
            var r = this.createRegion(leaf);
            this._root.insert(r);
            this._regions.push(r);
        }
    },
    
    /**
     * Search a particle in the tree
     * @param p graphical particle
     * @return RegionLeaf or null if the particle is not found
     */
    _search: function(p){
        if(p == undefined || p==null) return null;
        var q = [this._root], curr = null;
        while(q.length>0){
            curr = q.shift();
            if(curr instanceof Region){
                if(curr.contains(p)){
                    for(var c in curr.childs)
                        q.push(curr.childs[c]);
                }
            }
            if(curr instanceof RegionLeaf)
                if(curr.have(p)) return curr;
        }
        return null;
    },
    
    /**
     * This function must return a position for a particle
     * @param p is a graphical particle 
     */
    getPositionFor: function(p){
        return new THREE.Vector3(0,0,0);
    },
    
    update: function(system){
        if(arguments.length>0) this.setSystemRepos(system);
        var q = [this.root()], exitQueque = [];
        while(q.length>0){
            var node = q.shift();
            if(node instanceof Region){
                node.computeCenterOfMass();
                if(node.isEmpty()) this._remove(node);
                else q = q.concat(node.childs);
            } else if(node instanceof RegionLeaf){
                var points = [], alg = this;
                node.getOrigin().forEach(function(e){
                    var p = alg._getInfoFor(e);
                    if(!p) node.remove({modelReference:e});
                    else points.push(p);
                });
                this._updateLeaf(node,points);
            }
        }        
    },
    
    insert: function(p){
        var r, suggestedLeaf = null;
        if(!(p.position instanceof THREE.Vector3)) {
            p.position = this.getPositionFor(p);
        }
        r = this.createLeafRegion(p);
        if(this._leaves.length>0){
            // search leaf with same position
            var minLen = 2000, minLeaf = 0;
            if(this._leaves.length > 1 ) for(var l in this._leaves){
                var curr = this._leaves[l];
                var currLen = curr.position.clone().subSelf(r.position).lengthSq();
                if(currLen<minLen){minLen = currLen;minLeaf = l;}    
            }
            suggestedLeaf = this._leaves[minLeaf];
            if(this._leaves[minLeaf].samePosition(r)){
                return suggestedLeaf.unionWith(r)
            } 
        }
        // search faillure
        this._leaves.push(r);
        this._insert(r,suggestedLeaf);
        return r;
    },
    
    remove: function(p){
        for(var r in this._leaves){
            if(this._leaves[r].have(p)) {
                if(this._leaves[r].isOnlyFor(p)){
                    this._remove(this._leaves[r]);
                } else {
                    this._leaves[r].remove(p);
                }                
                return;
            }
        }
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
    
    /**
     *
     */
    createLeafRegion: function(p){
        var r = new RegionLeaf(p);
        return r;
    },
    
    /**
     * Function used to create a region from a leaf region
     * To insert the leaf in the new region this method recall @see Region.insert
     * @param r leaf region to promote
     * @return Region
     */
    createRegion: function(r){
        var p = r.position,
            pRegion = new Region(p.x,p.y,p.z);
        pRegion.parent = r.parent || this._root;
        pRegion.insert(r);
        return pRegion;
    }
}