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
    var curr = parent || this._root, 
        result = {insert: false};
    while(!result.insert){
        if(curr.contains(leaf)) {
            result = curr.insert(leaf);
            if(!result.insert) {
                //TODO create a regionBH, register, and insert leaf in the tree
                curr = result.region;
                
            }        
        } else {
            curr = curr.parent || this._root;
            curr.resize(leaf);        
        }        
    }
    this._leaves.push(leaf);
    leaf.parent = curr;
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

/**
 * Update the distribution algorithm passing new graphical system
 * It controls particles in the system and changes the configurations of regions
 * Complexity with n number of particles -> O(n * O(insert) )
 * @param system an object @see GraphicalSystem (optional)
 */
DistributionGraph.prototype.update = function(system){
    if(arguments.length>0) this.setSystemRepos(system);
    var particles = this._getParticles(),
        maxLeng = 100;
    this.reset();
    for(var p in particles){
        var dist = 0;
        try {
            dist = particles[p].position.length();
        } catch(e){dist = 0;}
        if(maxLeng<dist) maxLeng = dist;
    }
    this._root = new RegionBH();
    this._root.range = maxLeng + 10;
    for(var p in particles){
        this.insert(particles[p]);
    }
    this._root.computeCenterOfMass();
}

/**
 * Method to reset initial status of algorithm
 */
DistributionGraph.prototype.reset = function(){
    this._root = new RegionBH();
    this._root.range = 100;
    this._regions = [this._root];
    this._leaves = [];
}

