/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Region(x, y, z){
    this.type = "defcube";
    this.centerx = x;
    this.centery = y;
    this.centerz = z;
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
        var dist = element.quadDistance({x:this.centerx, y:this.centery, z:this.centerz});
        if (this.type == "spherical") {
            return (limit == dist);
        } if(this.type == "defcube"){ // definite cube region
            return (limit >= dist.x ) && (limit >= dist.y) && (limit >= dist.z);             
        } else { // cube region
            return (limit > dist.x ) && (limit > dist.y) && (limit > dist.z); 
        }
    },
    
    move : function (x,y,z){
        this.centerx = x;
        this.centery = y;
        this.centerz = z;
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
    
    // range è il lato del cubo rappresentante la regione
    insert: function(part, range){
        var i=0, rx=0, ry=0, rz=0;
        if(this.centerx < part.x) {
            i = 1;
            rx = range;
        }
        if(this.centery < part.y) {
            i += 2;
            ry = range;
        }
        if(this.centerz < part.z) {
            i += 4;
            rz = range;
        }
        
        if(this.childs[i] == undefined){
            this.childs[i] = part;
            this.testVar = true;
        } else if(this.childs[i] instanceof Region) {
            this.childs[i].insert(part, 0.5*range);
        } else {
            var newRange = 0.5*range;
            var newRegion = new Region(this.centerx - newRange + rx, this.centery - newRange + ry, 
                this.centerz - newRange + rz);
            newRegion.insert(part, newRange);
            newRegion.insert(this.childs[i], newRange);
            this.childs[i] = newRegion;
        }
    }
    
}