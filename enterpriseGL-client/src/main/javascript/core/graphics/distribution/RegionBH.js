EntGL.RegionBHTypes = {
    LeafContainer: "leafContainer",
    RegionContainer: "regionContainer"
}
    
EntGL.RegionBH = function(){
}

EntGL.RegionBH.prototype = new Region();
EntGL.RegionBH.constructor = EntGL.RegionBH;
EntGL.RegionBH.superclass = Region.prototype;

EntGL.RegionBH.prototype.init = function(x,y,z){
    EntGL.RegionBH.superclass.init.call(this,x,y,z);
    this.type = EntGL.RegionBHTypes.LeafContainer;
}

/**
 * If the region is a LeafContainer all leaf are pushed in childs array
 * otherwise select the subregion where the leaf must be inserted
 * 
 * @param leaf RegionLeaf to insert in the region
 * @return an Object with association:
 * - insert: boolean, true the operation is completed
 * - region: last region to make operation on the leaf passed
 * - index: region index where the leaf has to be inserted
 */
EntGL.RegionBH.prototype.insert = function(leaf){
    if(this.type == EntGL.RegionBHTypes.LeafContainer) {
        leaf.parent = this;
        this.childs.push(leaf);
        return {insert: true,region: this, register: false};
    }
    var i = EntGL.RegionBH.getIndexFor(leaf,this);
    if(this.childs[i] instanceof EntGL.RegionBH)
        return {insert: false, region: this.childs[i], register: false};    
    var newR = this.createSub(i);
    newR.insert(leaf);
    this.childs[i] = newR;
    return {insert:true, region: newR, register: true};
//    // delegate order to child
//    if(this.childs[i] instanceof EntGL.RegionBH)
//        return this.childs[i].insert(leaf);
//    // we can insert leaf and old leaf into new
//    if(leaf instanceof EntGL.RegionBH){
//        var oldLeaf = this.childs[i];
//        if(oldLeaf instanceof RegionLeaf){
//            this.childs[i] = leaf;
//            leaf.parent = this;
//            return leaf.insert(oldLeaf);
//        }
//    }        
//        //TODO delegate or orderer insertion 
//    return {insert: false, region: this, index: i};
}

EntGL.RegionBH.prototype.needSubdivision = function(){
    if(this.childs.length>10){
        var sig = 0, mean;
        //mean = this.centre.clone().subSelf(this.position).lengthSq();
        //if(mean == 0 ) mean = this.range * this.range * 0.25;
        mean = this.range * this.range * 0.25;
        for(var c in this.childs){
            var el = this.childs[c].position;
            sig += el.clone().subSelf(this.centre).lengthSq();
        }
        sig = Math.sqrt(sig / mean);
        if(sig>1) return true;
    }
    return false;
}

EntGL.RegionBH.prototype.promote = function(){
    if(this.type == EntGL.RegionBHTypes.RegionContainer) return [];
    this.type = EntGL.RegionBHTypes.RegionContainer;
    var Childs = [], leaf, newR,i;
    for(var l in this.childs){        
        leaf = this.childs[l];
        i = EntGL.RegionBH.getIndexFor(leaf,this);
        if(!(Childs[i] instanceof EntGL.RegionBH)){
            newR = this.createSub(i);            
            Childs[i] = newR;
        }
        Childs[i].insert(leaf);
    }
    this.childs = Childs;
    return Childs;
}

EntGL.RegionBH.prototype.createSub = function(index){
    var c = EntGL.RegionBH.getCentreFor(index, this),
        newR = new EntGL.RegionBH();
        newR.init(c.x,c.y,c.z);
        newR.parent = newR;
        newR.range = newR.range * 0.5;
    return newR;
}


EntGL.RegionBH.centerVectors = [
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
 * 
 * @param point punto per il quale si vuole individuare l'indice
 * @param space spazio da suddividere
 * @return int 0<= x < 8
 */
EntGL.RegionBH.getIndexFor = function(point,space){
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
EntGL.RegionBH.getCentreFor = function(index,space){
    var offset = EntGL.RegionBH.centerVectors[index].clone()
        .multiplyScalar(space.range * 0.5);
    return space.centre.clone().addSelf(offset);            
}


/**
 * Euristica di collocazione delle particelle in posizioni libere.
 * @param startRegion regione da cui iniziare la ricerca
 * @return THREE.Vector3
 */
EntGL.RegionBH.euristicFreePosition = function(startRegion){
    var q = [startRegion], pointRegions = [], head;
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
            } else return EntGL.RegionBH.getCentreFor(rInd, rcurr);
        }            
        if(pointRegions.length>0){ // ci sono punti in coda
            head = pointRegions[0];
            // crea un punto affianco al punto in coda 
            return EntGL.RegionBH.euristicNextPosition(head.particle, head.region, head.index);
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
EntGL.RegionBH.euristicNextPosition = function(point, space, spaceindex){
    if(arguments.length>=2) spaceindex = EntGL.RegionBH.getIndexFor(point,space);
    // ricava il centro della sotto regione dove saranno collocati i due punti
    var subSpace = {
        centre: EntGL.RegionBH.getCentreFor(spaceindex,space),
        range: space.range * 0.5
    };
    // ricava l'indice del punto esistente nella sua regione
    var occIndex = EntGL.RegionBH.getIndexFor(point,subSpace);
    // ritorna la posizione nella regione affianco al punto
    return EntGL.RegionBH.getCentreFor((occIndex+1)%8,subSpace);        
}

