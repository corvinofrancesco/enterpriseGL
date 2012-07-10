/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Region(x, y, z){
    this.type = "defcube";
    // define the centre of region
    this.centre = new THREE.Vector3(x,y,z);
    // define the centre of mass of region
    this.position = new THREE.Vector3(x,y,z);
    this.mass = 1;
    this.range = 10;
    this.parent = null;
    this.childs = [];
    this.index = 0;
}

Region.centerVectors = [
  new THREE.Vector3(-1,-1,-1),  
  new THREE.Vector3( 1,-1,-1),  
  new THREE.Vector3(-1, 1,-1),  
  new THREE.Vector3( 1, 1,-1),  
  new THREE.Vector3(-1,-1, 1),  
  new THREE.Vector3( 1,-1, 1),  
  new THREE.Vector3(-1, 1, 1),  
  new THREE.Vector3( 1, 1, 1) 
];

Region.prototype = {
    
    /**
     * This methods require and element Particle and verify if 
     * it is in the region.
     * 
     * @param element particle or region element to control (require position attribute)
     * @return boolean equal to true is the element is in region.
     */
    contains : function (element) {
        var limit = this.range;
        var dist = element.position.clone().subSelf(this.centre);
        if (this.type == "spherical") {
            return (limit * limit>= dist.lengthSq());
        }
        var ax = Math.abs(dist.x), ay = Math.abs(dist.y),
            az = Math.abs(dist.z);
        var max = Math.max(ax, ay,az);

        // definite cube region
        if(this.type == "defcube") return limit >= max;             
        // cube region
        else return limit > max; 
    },
    
    move : function (x,y,z){
        this.centre.set(x,y,z);
    },
    
    resize : function (range) {
        this.range = range;
    }, 
    
    forEach : function(func){        
        this.childs.forEach(function(e,i,a){
            func(e);
        });
    },
    
    createSubRegion: function(regionIndex,addedP){
        var r = new Region(),
            p = this.childs[regionIndex],
            newRange = this.range * 0.5;
        var offset = Region.centerVectors[regionIndex].clone()
            .multiplyScalar(newRange);
        r.centre = this.centre.clone().addSelf(offset);
        r.range = newRange;
        r.parent = this;
        r.index = regionIndex;
        
        r.insert(p);
        // control adding particles at same position
        r.insert(addedP);
        this.childs[regionIndex] = r;        
    },
    
    /**
     * Inserisce nella regione this la particella 
     * passata con il parametro part 
     * @param part particles to insert in the region
     */ 
    insert: function(part){
        var i=0;
        if(this.centre.x < part.position.x) i = 1;
        if(this.centre.y < part.position.y) i += 2;
        if(this.centre.z < part.position.z) i += 4;
        // update the region of particle
        part.barneshut.region = this;
        if(this.childs[i] == undefined) this.childs[i] = part;
        else if(this.childs[i] instanceof Region) {
            this.childs[i].insert(part, this.range);
        } else this.createSubRegion(i,part);
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
    },
    
    computeCenterOfMass: function(){
        var mass=0,
            p = new THREE.Vector3(0,0,0);
        for(var i in this.childs){
            var ch = this.childs[i];
            if(ch instanceof Region)
                ch.computeCenterOfMass();                    
            var m = ch.getMass();
            mass += m;
            p.addSelf(ch.position
                .clone().multiplyScalar(m));
        }        
        // distinguere il centro della regione dal centro di massa??
        this.position = p.multiplyScalar(1.0 / mass);
        this.mass = mass;
    },
    
    getMass : function(){
        return this.mass;
    }
    
}