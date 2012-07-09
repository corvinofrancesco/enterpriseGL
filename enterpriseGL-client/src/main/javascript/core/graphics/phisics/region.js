/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Region(x, y, z){
    this.type = "defcube";
    this.position = new THREE.Vector3(x,y,z);
    this.mass = 1;
    this.range = 10;
    this.parent = null;
    this.childs = [];
    this.indexIds = {}; // gli indici devono essere unici
    this.indexSize = [];
    this.testVar = false;

}

Region.prototype = {
    
    /**
     * This methods require and element Particle and verify if 
     * it is in the region.
     * 
     * @return boolean equal to true is the element is in region.
     */
    contains : function (element) {
        var limit = this.range * this.range;
        var dist = element.clone().subSelf(this.position);
        if (this.type == "spherical") {
            return (limit == dist.length());
        } if(this.type == "defcube"){ // definite cube region
            return (limit >= dist.x ) && (limit >= dist.y) && (limit >= dist.z);             
        } else { // cube region
            return (limit > dist.x ) && (limit > dist.y) && (limit > dist.z); 
        }
    },
    
    move : function (x,y,z){
        this.position.set(x,y,z);
    },
    
    resize : function (range) {
        this.range = range;
    }, 
    
    forEach : function(func){        
        this.childs.forEach(function(e,i,a){
            func(e);
        });
    },
    
    add : function(n) {
        this.childs.push(n);
        var ElId = "unknow", ElSize = 0;
        try {ElSize = n.size();} catch(e){};
        try {ElId = n.id;} catch(e){};
        
        /// insert elements in the indexes
        this.indexIds[ElId] = this.childs.length;
        this.indexSize.push({size:ElSize, pos:this.childs.length});
        
        /// sorting indexes
        //this.indexIds.sort( function(a,b){return a.id - b.id;});
        this.indexSize.sort( function(a,b){return a.size - b.size;});

    },
    
    getById : function(id){
        if (this.contains(id)) 
            return this.nodes[this.indexIds[id]];
    },
    
    /**
     * Inserisce nella regione this la particella 
     * passata con il parametro part 
     */ 
    insert: function(part){
        var i=0, rx=0, ry=0, rz=0;
        if(this.position.x < part.position.x) {
            i = 1;
            rx = 2 * this.range;
        }
        if(this.position.y < part.position.y) {
            i += 2;
            ry = 2 * this.range;
        }
        if(this.position.z < part.position.z) {
            i += 4;
            rz = 2 * this.range;
        }
        
        if(this.childs[i] == undefined){
            this.childs[i] = part;
            this.testVar = true;
        } else if(this.childs[i] instanceof Region) {
            this.childs[i].insert(part, this.range);
        } else {
            var newRange = this.range;
            var newRegion = new Region(
                this.position.x - newRange + rx, 
                this.position.y - newRange + ry, 
                this.position.z - newRange + rz);
            newRegion.range = 0.5 * newRange;
            newRegion.insert(part, newRange);
            newRegion.insert(this.childs[i], newRange);
            this.childs[i] = newRegion;
        }
    }, 
    
    computeCenterOfMass: function(){
        var mass=0, m=0,
            p = new THREE.Vector3(0,0,0);
        this.childs.forEach(function(ch){
            if (ch!=null) {
                if(ch instanceof Region){
                    ch = ch.computeCenterOfMass();                    
                } else {
                    m = ch.mass;
                    mass += m;
                    p.addSelf(ch.position.clone().multiplyScalar(m));
                }
            }
        });
        
        m = 1.0 / mass;
        // distinguere il centro della regione dal centro di massa??
        this.position = p.multiplyScalar(m);
        this.mass = mass;
        
        return {mass:mass, x:this.position.x, y:this.position.y, z:this.position.z};
    },
    
    getMass : function(){
        
    }
    
}