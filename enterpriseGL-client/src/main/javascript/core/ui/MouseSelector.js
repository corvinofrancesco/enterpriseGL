/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
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
    update: function (domx,domy){
        var x = ( domx / this.width ) * 2 - 1;
        var y =  - ( domy / this.height ) * 2 + 1;;
        
        var vector = new THREE.Vector3( x, y, 0.5 );
        this.projector.unprojectVector( vector, this.camera );

        this.ray = new THREE.Ray( 
            this.camera.position, 
            vector.subSelf( this.camera.position ).normalize()
        );
    },
    
    getObjects : function(){
        if(this.ray==null) return null;
        var intersects = this.ray.intersectObjects( this.objects );
        return intersects;
    },
    
    getPlane : function() {
        if(this.ray==null) return null;
        var intersects = this.ray.intersectObject( this.plane );
        return intersects;        
    }
}
