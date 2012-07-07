/** 
 * This class manage the input of mouse on graphic element
 * @param camera object with information of current position of point of view
 * @param plane graphical object with 
 */
function MouseSelector(camera,plane,objects,w,h){
    this.camera = camera;
    this.plane = plane;
    this.objects = objects;
    this.width = w;
    this.height = h;
    /// init projector
    this.projector = new THREE.Projector();
    this.ray = null;
}

MouseSelector.prototype = {
    /**
     * Update the position of mouse
     * @param domx x position of mouse in the document
     * @param domy y position of mouse in the document
     */
    update: function (domx,domy){
        var x = ( domx / this.width ) * 2 - 1;
        var y =  - ( domy / this.height ) * 2 + 1;;
        
        var vector = new THREE.Vector3( x, y, 1 );
        this.projector.unprojectVector( vector, this.camera );

        this.ray = new THREE.Ray( 
            this.camera.position, 
            vector.subSelf( this.camera.position ).normalize()
        );
    },
    
    /**
     * Returns all objects intersected by the mouse 
     */
    getObjects : function(){
        if(this.ray==null) return null;
        var intersects = this.ray.intersectObjects( this.objects );
        return intersects;
    },
    
    /**
     * Return the intersection of mouse with the plane
     */
    getPlane : function() {
        if(this.ray==null) return null;
        var intersects = this.ray.intersectObject( this.plane );
        return intersects;        
    }
}
