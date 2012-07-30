DistributionGraph.prototype = new DistributionAlg();
DistributionGraph.constructor = DistributionGraph;
DistributionGraph.superclass = DistributionAlg.prototype;

function DistributionGraph(){
    this._root = new RegionBH(0,0,0);
}

/**
 * Se p non ha relazioni: 
 * crea una regione libera restituisce il centro della regione;
 * Se p ha un unica relazione:
 * crea una regione libera vicino all'altra particella
 * restituisce il centro delle regione            
 * Altrimenti:
 * calcola la media delle posizioni delle particelle relazionate
 * restituisce la media calcolata
 *
 * @param p particle to assign position
 * @return THREE.Vector3
 */
DistributionGraph.prototype.getPositionFor = function(p){
    switch(p.relations.length){
        case 0: case undefined: case null:
            return RegionBH.euristicFreePosition(this._root);
        case 1:
            var pNext = this._getInfoFor(p.relations[0]), leaf = null;
            leaf = this._search(pNext);
            if(leaf==null) return RegionBH.euristicFreePosition(this._root);
            return RegionBH.euristicNextPosition(pNext,leaf.parent);
        default:
            var retPos = new THREE.Vector3(0,0,0),div=0;
            for(var i in p.relations){
                var relP = this._getInfoFor(p.relations[i]);
                if(relP!=null) {
                    retPos.addSelf(relP.position);
                    div ++;
                }
            }
            // if mean elaboration have a faillure
            if(div<2) return  RegionBH.euristicFreePosition(this._root);
            retPos.multiplyScalar(1/div);
            return retPos;
    }
};

/**
 * Inserisce la relazione foglia nella parte più bassa dell'albero 
 * @param leaf RelationLeaf to insert in the tree region
 * @param parent RelationLeaf considered to be proximus
 */ 
DistributionGraph.prototype._insert = function(leaf, parent){
    var q = [parent || this._root], curr, candidate;
    while(q.length>0){
        curr = q.shift();
        var i = RegionBH.getIndexFor(leaf,curr);
        candidate = curr.childs[i];
        if(candidate instanceof Region){
            candidate.insert(leaf);            
            if(candidate.needSubdivision()){
                candidate.remove(leaf);
                q.push(candidate);
            }
        } else if(candidate instanceof RegionLeaf){
            if(candidate.samePosition(leaf)){
                candidate.unionWith(leaf);                
            } else {
                var newR = curr.createSub(i);
                curr.childs[i] = newR;
                this._insert(candidate,curr);
                newR.insert(leaf);    
                this._regions.push(newR);
            }
        } else {
            curr.childs[i] = leaf;
        }
    }
}

/**
 * Search a particle in the tree
 * @param p graphical particle
 * @return RegionLeaf or null if the particle is not found
 */
DistributionGraph.prototype._search = function(p){
    if(p == undefined || p==null) return null;
    for(var l in this._leaves){
        var curr = this._leaves[l];
        if(curr.have(p)) return curr;
    }
    return null;
}
    
/**
 * Create a region from a leaf
 * @param leaf object RegionLeaf source of new region
 * @param index location of leaf in the parent region (optional)
 * @param centre centre of subregion where must be created new region (optional)
 * @param otherLeaf 
 */
DistributionGraph.prototype.createRegion = function(leaf,index,centre,otherLeaf){
    var parent = leaf.parent || this._root;
    var i = index || RegionBH.getIndexFor(leaf, parent);
    var c = centre || RegionBH.getCentreFor(i, parent);
    var pRegion = new Region(c.x,c.y,c.z);
    pRegion.parent = parent;
    pRegion.range = parent.range * 0.5;
    var firstP = RegionBH.getIndexFor(leaf,pRegion);
    pRegion.childs[firstP] = leaf;
    leaf.parent = pRegion;
    parent.childs[i] = pRegion;
    if(otherLeaf){
        var otherP = RegionBH.getIndexFor(otherLeaf,pRegion);
        if(otherP!=firstP){
            parent.childs[otherP] = otherLeaf;
            otherLeaf.parent = pRegion;
        } else {
            otherLeaf.parent = pRegion;
            leaf.unionWith(otherLeaf);
        }
    }
    return pRegion;
}

DistributionGraph.prototype.update = function(system){
    if(arguments.length>0) this.setSystemRepos(system);
    var q = [this.root()], exitQ = [], elemCurr;
    while(q.length>0){
        elemCurr = q.shift();
        if(elemCurr instanceof Region){
            elemCurr.computeCenterOfMass();
            if(!elemCurr.isEmpty()) q = q.concat(elemCurr.childs);
            else if(elemCurr!=this._root) this._remove(elemCurr);
        } else if(elemCurr instanceof RegionLeaf){
            var origin = elemCurr.getOrigin();
            if(elemCurr.isEmpty()) this._remove(elemCurr);
            else if(origin.length>1){
                for(var o in origin){
                    var p = this._getInfoFor(origin[o]);
                    if(elemCurr.samePosition(p)) continue;
                    exitQ.push(p)
                }
            }
        }
    }
    while(exitQ.length>0){
        elemCurr = exitQ.shift();
        this.remove(elemCurr);
        this.insert(elemCurr);
    }
    alert(this._root);
}
