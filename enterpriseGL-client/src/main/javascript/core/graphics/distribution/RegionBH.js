RegionBH.prototype = new Region(0,0,0);
RegionBH.constructor = RegionBH;
RegionBH.superclass = Region.prototype;

RegionBH.types = {
    LeafContainer: "leafContainer",
    RegionContainer: "regionContainer"
}
    

function RegionBH(){
    this.type = RegionBH.types.LeafContainer;
}

RegionBH.prototype.insert = function(leaf){
    if(this.type == RegionBH.types.LeafContainer) {
        leaf.parent = this;
        this.childs.push(leaf);
        return {insert: true,region: this};
    }
    var i = RegionBH.getIndexFor(leaf,this);
    // delegate order to child
    if(this.childs[i] instanceof RegionBH)
        return this.childs[i].insert(leaf);
    // we can insert leaf and old leaf into new
    if(leaf instanceof RegionBH){
        var oldLeaf = this.childs[i];
        if(oldLeaf instanceof RegionLeaf){
            this.childs[i] = leaf;
            leaf.parent = this;
            return leaf.insert(oldLeaf);
        }
    }        
        //TODO delegate or orderer insertion 
    return {insert: false, region: this, index: i};
}

RegionBH.prototype.needSubdivision = function(){
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

RegionBH.prototype.createSub = function(index){
    var c = RegionBH.getCentreFor(index, this),
        newR = new RegionBH(c.x,c.y,c.z);
        newR.parent = newR;
        newR.range = newR.range * 0.5;
    return newR;
}


RegionBH.centerVectors = [
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
RegionBH.getIndexFor = function(point,space){
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
RegionBH.getCentreFor = function(index,space){
    var offset = RegionBH.centerVectors[index].clone()
        .multiplyScalar(space.range * 0.5);
    return space.centre.clone().addSelf(offset);            
}


/**
 * Euristica di collocazione delle particelle in posizioni libere.
 * @param startRegion regione da cui iniziare la ricerca
 * @return THREE.Vector3
 */
RegionBH.euristicFreePosition = function(startRegion){
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
            } else return RegionBH.getCentreFor(rInd, rcurr);
        }            
        if(pointRegions.length>0){ // ci sono punti in coda
            head = pointRegions[0];
            // crea un punto affianco al punto in coda 
            return RegionBH.euristicNextPosition(head.particle, head.region, head.index);
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
RegionBH.euristicNextPosition = function(point, space, spaceindex){
    if(arguments.length>=2) spaceindex = RegionBH.getIndexFor(point,space);
    // ricava il centro della sotto regione dove saranno collocati i due punti
    var subSpace = {
        centre: RegionBH.getCentreFor(spaceindex,space),
        range: space.range * 0.5
    };
    // ricava l'indice del punto esistente nella sua regione
    var occIndex = RegionBH.getIndexFor(point,subSpace);
    // ritorna la posizione nella regione affianco al punto
    return RegionBH.getCentreFor((occIndex+1)%8,subSpace);        
}

