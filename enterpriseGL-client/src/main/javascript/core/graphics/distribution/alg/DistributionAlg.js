/**
 * This class provides an interface for Distribution Algorithms 
 */
function DistributionAlg(){
    this._root = new Region(0,0,0);
    this._root.range = 100;
    this._regions = [this._root];
    this._leaves = [];
    this._infoRepository = null;
    this._lastInsert = null;
    this._nextPointFunct = function(last){
        if(last==null) return new THREE.Vector3(0,0,0);
        var dist = last.length(), 
            newX = (Math.random()*2 - 1) + last.x,
            newY = (Math.random()*2 - 1) + last.y,
            newZ = (Math.random()*2 - 1) + dist;        
        return new THREE.Vector3(newX,newY,newZ);
    }
}

DistributionAlg.Algoritms = function(name){
    switch(name){
        case "graph":return new DistributionGraph();
        case "conetree":return new DistributionConeTree();
        default:return new DistributionAlg();
    }
}

DistributionAlg.prototype = {
    
    setSystemRepos: function(system){this._infoRepository = system;},
    _getInfoFor: function(id){
        var p = null;
        try{
            p = this._infoRepository.particles[id];
        } catch(e){return null;}
        return p;
    },
    
    _getParticles: function(){
        var particles = {};
        try {
            particles = this._infoRepository.particles;
        } catch(e){ return {};}
        return particles;
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
     * This method insert a new region leaf in the distribution
     * The method must:
     * - adding leaf if created in the list of leaf
     * - adding, if created, additional regions in the relative list
     * - setting correctly parent of new leaf
     * - setting correctly at the parent the new child
     * @param leaf RegionLeaf to insert in the destRegion
     * @param destRegion Region parent, if undefined is this._root
     */
    _insert: function(leaf, destRegion){
        this._leaves.push(leaf);
        destRegion = destRegion || this._root;
        leaf.parent = destRegion;
        destRegion.insert(leaf);
    },
    
    /**
     * Search a particle in the tree
     * @param p graphical particle, instance of @see EntParticle or a identificator
     * @return RegionLeaf or null if the particle is not found
     */
    _search: function(p){
        if(p == undefined || p==null) return null;
        for(var l in this._leaves){
            var curr = this._leaves[l];
            if(curr.have(p)) return curr;
        }
        return null;
//        if(p == undefined || p==null) return null;
//        var q = [this._root], curr = null;
//        while(q.length>0){
//            curr = q.shift();
//            if(curr instanceof Region){
//                if(curr.contains(p)){
//                    for(var c in curr.childs)
//                        q.push(curr.childs[c]);
//                }
//            }
//            if(curr instanceof RegionLeaf)
//                if(curr.have(p)) return curr;
//        }
//        return null;
    },
    
    /**
     *  Search leaf next to position
     *  This methods have complexity x -> the number of leaf registered
     *  @param pos THREE.Vector3 position to search in the Regions 
     *  @return RegionLeaf, the leaf next to pos parameter
     */
    _searchLeafNextPosition: function(pos){
        if(!(pos instanceof THREE.Vector3)) return null;
        var minLen = 2000, minLeaf = null;
        for(var l in this._leaves){
            var curr = this._leaves[l];
            var currLen = curr.position.clone().subSelf(pos).lengthSq();
            if(currLen<minLen){ minLen = currLen; minLeaf = curr;}    
        }
        return minLeaf;
    },
    
    /**
     * This function must return a position for a particle
     * @param p is a graphical particle 
     * @return a free position for a graphical particle
     */
    getPositionFor: function(p){
        this._lastInsert = this._nextPointFunct(this._lastInsert);
        return this._lastInsert;
    },
    
    /**
     * Update the distribution algorithm passing new graphical system
     * It controls particles in the system and changes the configurations of regions
     * @param system an object @see EntGL.System (optional)
     */
    update: function(system){
        if(arguments.length>0) this.setSystemRepos(system);
        var q = [this.root()],
            particles = this._getParticles();
        this.reset();
        for(var p in particles){
            this.insert(particles[p]);
        }
        this._root.computeCenterOfMass();
//        while(q.length>0){
//            var elemCurr = q.shift();
//            if(elemCurr instanceof Region){
//                elemCurr.computeCenterOfMass();
//                if(!elemCurr.isEmpty()) q = q.concat(elemCurr.childs);
//                else if(elemCurr!=this._root) this._remove(elemCurr);
//            } else if(elemCurr instanceof RegionLeaf){
//                var points = [], alg = this;
//                if(elemCurr.isEmpty()) {
//                    this._remove(elemCurr);
//                } else {
//                    elemCurr.getOrigin().forEach(function(e){
//                        var p = alg._getInfoFor(e);
//                        if(!p) elemCurr.remove({modelReference:e});
//                        else points.push(p);
//                    });
//                    elemCurr.update(points);                    
//                }
//            }
//        }        
    },
    
    /**
     * Insert a graphical particle in the distribution
     * @param p Graphical Particle or @see EntParticle
     * @return RegionLeaf where the particle is going to be insert
     */
    insert: function(p){
        if(p instanceof EntParticle) p.modelReference = p.id;
        if(!(p.position instanceof THREE.Vector3)) {
            p.position = this.getPositionFor(p);
        }
        var r = new RegionLeaf({
            position:p.position, 
            modelReference: p.modelReference
        });
        this._insert(r);
        return r;
    },
    
    /**
     * Remove a particle from the distribution
     * @param p graphical particle to be removed
     */
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
    
    /**
     * Method to reset initial status of algorithm
     */
    reset: function(){
        this._root = new Region(0,0,0);
        this._root.range = 100;
        this._regions = [this._root];
        this._leaves = [];
    },

    root: function(){
        return this._root;
    },
    
    /**
     * Function used to create a region from a leaf region
     * To insert the leaf in the new region this method recall @see Region.insert
     * @param r leaf region to promote
     * @return Region
     */
    createRegion: function(r){
        var p = r.position,
            pRegion = new Region();
        pRegion.init(p.x,p.y,p.z);    
        pRegion.parent = r.parent || this._root;
        pRegion.insert(r);
        return pRegion;
    },
    
    getCollisions: function(){
        var collisions = [];
        for(var leaf in this._leaves){
            var set = this._leaves[leaf].getOrigin();
            if(set.length>1) collisions.push(set);
        }
        return collisions;
    }
}
