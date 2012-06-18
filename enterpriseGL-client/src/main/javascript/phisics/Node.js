function Node(){
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.parent = null;
    this.nodes = [];
    this.indexIds = {}; // gli indici devono essere unici
    this.indexSize = [];
}

Node.prototype = {
    forEach : function(func){        
        this.nodes.forEach(function(e,i,a){
            func(e);
        });
    },
    
    add : function(n) {
        this.nodes.push(n);
        var ElId = "unknow", ElSize = 0;
        try {ElSize = n.size();} catch(e){};
        try {ElId = n.id;} catch(e){};
        
        /// insert elements in the indexes
        this.indexIds[ElId] = this.nodes.length;
        this.indexSize.push({size:ElSize, pos:this.nodes.length});
        
        /// sorting indexes
        //this.indexIds.sort( function(a,b){return a.id - b.id;});
        this.indexSize.sort( function(a,b){return a.size - b.size;});

    },
    
    move : function(x,y,z) {
        this.x += x;
        this.y += y;
        this.z += z;
    },
    
    quadDistance : function(n){
        var node = n || {x:0, y:0, z:0};
        var r = {
            x: (this.x - node.x),
            y: (this.y - node.y),
            z: (this.z - node.z)
        };
        return r.x * r.x + r.y * r.y + r.z * r.z;       
    },
    
    distance : function(n){
        return Math.sqrt(this.quadDistance(n));
    },

    size : function(){
        var size = 0;
        /// remove if the graph is recursive
        for(var i in this.indexSize){
            size += this.indexSize[i].size;
        }
        return this.nodes.length + size;
    },
    
    contains : function(id){
        return !(this.indexIds[id]== undefined);
    },
    
    getById : function(id){
        if (this.contains(id)) 
            return this.nodes[this.indexIds[id]];
    }
}