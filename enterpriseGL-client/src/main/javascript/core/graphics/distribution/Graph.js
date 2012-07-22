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

DistributionGraph.prototype.getPositionFor = function(p){
    switch(p.relations){
        case 0: case undefined: case null:
            // crea una regione libera restituisce il centro della regione
            return this.euristicFreePosition();
        case 1:
            // crea una regione libera vicino all'altra particella
            // restituisce il centro delle regione            
            break;
        default:
            // calcola la media delle posizioni delle particelle relazionate
            // restituisce la media calcolata
    }
};

/**
 * Euristica di collocazione delle particelle in posizioni libere.
 * @param startRegion regione da cui iniziare la ricerca
 * @return THREE.Vector3
 */
DistributionGraph.prototype.euristicFreePosition = function(startRegion){
    var q = [startRegion || this.root], pointRegions = [], head;
    while(q.length>0){
        var rcurr = q.shift();
        if(rcurr.isEmpty()) return rcurr.centre;
        for(var rInd=0; rInd<rcurr.childs; rInd++){
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
    if(arguments.length>2) spaceindex = this.getIndexFor(point,space);
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
        candidate = curr.clilds[i];
        if(candidate instanceof Region){
            q.push(candidate);
        } else if(candidate instanceof RegionLeaf){
            //TODO creare regione da RegionLeaf
            this.createSubRegion(i,leaf); //????
        } else {
            curr.insert(leaf);
            return;
        }
    }
}
    


DistributionGraph.prototype = {
        
    createRegion: function(parent, regionIndex,addedP){
        var r = new Region(),
            p = this.childs[regionIndex],
            newRange = this.range * 0.5;
        var offset = Region.centerVectors[regionIndex].clone()
            .multiplyScalar(newRange);
        r.centre = this.centre.clone().addSelf(offset);
        r.range = newRange;
        r.parent = this;
        r.index = regionIndex;
        var distance = new THREE.Vector3().copy(p.position).subSelf(addedP.position);
        if(distance.lengthSq()<1) {
            r.insert(p);
            var freeIndices = Math.max(7,this.childs.length);
            this.childs[freeIndices++] = addedP;
            return;
        }
        r.insert(p);
        // control adding particles at same position
        r.insert(addedP);
        this.childs[regionIndex] = r;        
    },
    
    /**
     * @param part node to reinsert
     * @param from region where part is collocate actually
     */
    reinsert: function(part,from){
        // remove particle from origin if exist
        if(from) for(var i in from.childs)
            if(from.childs[i]== part) 
                from.childs[i]=undefined;
        // control if the part is effectly in the region
        if(!this.contains(part)){
            if(this.parent)
                this.parent.reinsert(part);
            return;
        }          
        this.insert(part);
    }    
    
}
