function Region(){
    this.childs = [];
    this.type = "defcube";
    this.centre = new THREE.Vector3(0,0,0);
    this.position = new THREE.Vector3(0,0,0);
    this.mass = 1;
    this.range = 10;    
    this.index = 0;        
}

Region.prototype = {
    
    init: function(x,y,z){
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
    },
    
    /**
     * This methods require and element Particle and verify if 
     * it is in the region.
     * 
     * @param element particle or region element to control (require position attribute)
     * @return boolean equal to true is the element is in region.
     */
    contains : function (element) {
        if(!(element.position instanceof THREE.Vector3)) return false;
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
        if(range instanceof RegionLeaf){
            this.range = this.centre.clone().subSelf(range.position).length();
        } else this.range = range;
    },
    
    remove: function(child){
        for(var i in this.childs){
            if(this.childs[i] == child) {
                this.childs[i] = undefined;
                return;
            }
        }
    },
    
    forEach : function(func){        
        this.childs.forEach(function(e,i,a){
            func(e);
        });
    },
    
    /**
     * Inserisce nella regione this la particella 
     * passata con il parametro part 
     * @param part particles to insert in the region
     */ 
    insert: function(part){
        part.parent = this;
        this.childs.push(part);        
    }, 
    
    computeCenterOfMass: function(){
        var mass=0,
            p = new THREE.Vector3(0,0,0);
        for(var i in this.childs){
            var ch = this.childs[i], m = 0;
            if(ch==null || ch==undefined) continue;
            if(ch instanceof Region){
                ch.computeCenterOfMass();                    
            } 
            if(ch.getMass instanceof Function) m = ch.getMass();
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
    },
    
    isEmpty: function(){
        if(this.childs.length==0) return true;
        for(var i in this.childs) 
            if(this.childs[i]) return false;
        return true;
    },
    
    toString: function(){
        var str = "{ type: region, childs: [ \n";
        for(var i in this.childs) str += "child" + i + ": " + this.childs[i] + " ,";
        str += "\n ]}";
        return str;
    }
    
}