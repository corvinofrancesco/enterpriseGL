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
    
    /**
     * Inserisce nella regione this la particella 
     * passata con il parametro part 
     */ 
    insert: function(part){
        var i=0, r = new THREE.Vector3(0,0,0);
        if(this.position.x < part.position.x) {
            i = 1; r.setX(2 * this.range);
        }
        if(this.position.y < part.position.y) {
            i += 2; r.setY(2 * this.range);
        }
        if(this.position.z < part.position.z) {
            i += 4; r.setZ(2 * this.range);
        }
        
        if(this.childs[i] == undefined) this.childs[i] = part;
        else if(this.childs[i] instanceof Region) {
            this.childs[i].insert(part, this.range);
        } else {
            var newRange = this.range;
            var newRegion = new Region();
            newRegion.position = this.position.clone()
                .addScalar(-newRange).addSelf(r);
            newRegion.range = 0.5 * newRange;
            newRegion.insert(part, newRange);
            newRegion.insert(this.childs[i], newRange);
            this.childs[i] = newRegion;
        }
    }, 
    
    computeCenterOfMass: function(){
        var mass=0,
            p = new THREE.Vector3(0,0,0);
        this.childs.forEach(function(ch){
            if(ch instanceof Region){
                ch = ch.computeCenterOfMass();                    
            } else {
                var m = ch.mass;
                mass += m;
                p.addSelf(ch.position
                    .clone().multiplyScalar(m));
            }
        });        
        // distinguere il centro della regione dal centro di massa??
        this.position = p.multiplyScalar(1.0 / mass);
        this.mass = mass;
        
        return {mass:mass, x:this.position.x, y:this.position.y, z:this.position.z};
    },
    
    getMass : function(){
        this.comuteCenterOfMass();
    }
    
}