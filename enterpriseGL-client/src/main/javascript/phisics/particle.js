function Particle(id){
    /** origin position for new particles */
    this.x = 0;
    this.y = 0;
    this.z = 0;
    
    /** starting velocity of particle */
    this.velocity = {x:0,y:0,z:0};
    
    /** color of particles */
    this.color = 0;
    
    /** initial energy */
    this.energy = 1;
    
    /** size of particles */
    this.size = 1;
    
    /** description and identification of particle */
    this.id = id;
    this.propertyCallBack = null;
}

Particle.prototype = {
    
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
    
    /**
     * This function use the callback <code>propertyCallBack</code> to retrive
     * specific information of this object.
     * 
     * @return property called name for this object
     */
    getProperty: function(name){    
        // TODO getProperty
    }
       
}
