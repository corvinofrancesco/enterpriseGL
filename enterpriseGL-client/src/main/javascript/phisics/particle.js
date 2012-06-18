/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Particle(id){
    this.x = 0;
    this.y = 0;
    this.z = 0;
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
