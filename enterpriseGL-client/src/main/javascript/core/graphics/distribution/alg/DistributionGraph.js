DistributionGraph.prototype = new DistributionAlg();
DistributionGraph.constructor = DistributionGraph;
DistributionGraph.superclass = DistributionAlg.prototype;

function DistributionGraph(){
    
}

DistributionGraph.centerVectors = [
  new THREE.Vector3(-1,-1,-1),  
  new THREE.Vector3( 1,-1,-1),  
  new THREE.Vector3(-1, 1,-1),  
  new THREE.Vector3( 1, 1,-1),  
  new THREE.Vector3(-1,-1, 1),  
  new THREE.Vector3( 1,-1, 1),  
  new THREE.Vector3(-1, 1, 1),  
  new THREE.Vector3( 1, 1, 1) 
];

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
            return this.euristicFreePosition();
        case 1:
            var pNext = this._getInfoFor(p.relations[0]), leaf = null;
            leaf = this._search(pNext);
            if(leaf==null) return this.euristicFreePosition();
            return this.euristicNextPosition(pNext,leaf.parent);
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
            if(div<2) return  this.euristicFreePosition();
            retPos.multiplyScalar(1/div);
            return retPos;
    }
};

/**
 * Euristica di collocazione delle particelle in posizioni libere.
 * @param startRegion regione da cui iniziare la ricerca
 * @return THREE.Vector3
 */
DistributionGraph.prototype.euristicFreePosition = function(startRegion){
    var q = [startRegion || this.root()], pointRegions = [], head;
    while(q.length>0){
        var rcurr = q.shift();
        if(rcurr.isEmpty()) return rcurr.centre;
        for(var rInd=0; rInd<8; rInd++){
            var elem = rcurr.childs[rInd];
            if(elem instanceof Region){                    
                q.push(elem);
            } else if(elem instanceof RegionLeaf) {
                // aggiunge regione del punto
                pointRegions.push({
                    region: rcurr, index: rInd, 
                    particle: elem});
            } else return this.getCentreFor(rInd, rcurr);
        }            
        if(pointRegions.length>0){ // ci sono punti in coda
            head = pointRegions[0];
            // crea un punto affianco al punto in coda 
            return this.euristicNextPosition(head.particle, head.region, head.index);
        }        
    }
    return new THREE.Vector3(0,0,0);
}

/**
 * Restituisce una posizione libera prossima a un punto dalla regione fornita
 * @param point punto di prossimità dove cercare la posizione
 * @param space regione dove cercare il punto
 * @param spaceindex (opzionale) indice della sottoregione dove collocare il punto
 * @return THREE.Vector3
 */
DistributionGraph.prototype.euristicNextPosition = function(point, space, spaceindex){
    space = space || this.root();
    if(arguments.length>=2) spaceindex = this.getIndexFor(point,space);
    // ricava il centro della sotto regione dove saranno collocati i due punti
    var subSpace = {
        centre: this.getCentreFor(spaceindex,space),
        range: space.range * 0.5
    };
    // ricava l'indice del punto esistente nella sua regione
    var occIndex = this.getIndexFor(point,subSpace);
    // ritorna la posizione nella regione affianco al punto
    return this.getCentreFor((occIndex+1)%8,subSpace);        
}

/**
 * 
 * @param point punto per il quale si vuole individuare l'indice
 * @param space spazio da suddividere
 * @return int 0<= x < 8
 */
DistributionGraph.prototype.getIndexFor = function(point,space){
    var i =0;
    if(space.centre.x < point.position.x) i = 1;
    if(space.centre.y < point.position.y) i += 2;
    if(space.centre.z < point.position.z) i += 4;
    return i;
}

/**
 * @param index indice della sottoregione
 * @param space regione parent 
 * @return THREE.Vector3
 */
DistributionGraph.prototype.getCentreFor = function(index,space){
    var offset = DistributionGraph.centerVectors[index].clone()
        .multiplyScalar(space.range * 0.5);
    return space.centre.clone().addSelf(offset);            
}

/**
 * Inserisce la relazione foglia nella parte più bassa dell'albero 
 * @param leaf RelationLeaf to insert in the tree region
 * @param suggestLeaf RelationLeaf considered to be proximus
 */ 
DistributionGraph.prototype._insert = function(leaf, suggestLeaf){
    var q = [this._root], curr, candidate;
    while(q.length>0){
        curr = q.shift();
        var i=this.getIndexFor(leaf,curr);
        candidate = curr.childs[i];
        if(candidate instanceof Region){
            q.push(candidate);
        } else if(candidate instanceof RegionLeaf){
            var newReg = this.createRegion(candidate,false,false,leaf);
            this._regions.push(newReg);
            return;
        } else {
            curr.childs[i] = leaf;
            leaf.parent = curr;
            return;
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
    var i = index || this.getIndexFor(leaf, parent);
    var c = centre || this.getCentreFor(i, parent);
    var pRegion = new Region(c.x,c.y,c.z);
    pRegion.parent = parent;
    pRegion.range = parent.range * 0.5;
    var firstP = this.getIndexFor(leaf,pRegion);
    pRegion.childs[firstP] = leaf;
    leaf.parent = pRegion;
    parent.childs[i] = pRegion;
    if(otherLeaf){
        var otherP = this.getIndexFor(otherLeaf,pRegion);
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
    var particles = this._getParticles();
    this.reset();
    for(var p in particles){
        this.insert(particles[p]);
    }
}