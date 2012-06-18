/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function Region(){
    this.type = "spherical";
    this.centre = new Particle();
    this.range = 10;
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
        var dist = element.quadDistance(this.centre);
        if (this.type == "spherical") {
            return (limit == dist);
        } if(this.type == "defcube"){ // definite cube region
            return (limit >= dist.x ) && (limit >= dist.y) && (limit >= dist.z);             
        } else { // cube region
            return (limit > dist.x ) && (limit > dist.y) && (limit > dist.z); 
        }
    },
    
    move : function (x,y,z){
        this.center.move(x,y,z);
    },
    
    resize : function (range) {
        this.range = range;
    }
    
}