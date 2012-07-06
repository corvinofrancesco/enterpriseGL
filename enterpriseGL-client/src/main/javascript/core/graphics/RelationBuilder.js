/**
 * Permette di definire le primitive delle relazioni
 */
function RelationBuilder(sys){
    this.geometry = null;
    this.generator = null;
    this.properties = null; 
    this.system = sys;
    this.object = null;
    this.originPoint = null;
}

RelationBuilder.prototype = {
    setGeometry : function (geometry) {
        this.geometry = geometry;
    },
    
    setGenerator : function (generator) {
        this.generator = generator;
    },
    
    setProperties : function (properties){
        this.properties = properties;
    },
    
    /**
     * Create a new relation object
     */
    reset: function(originPoint){
        this.originPoint = originPoint;
    },
    
    build : function(extremisPoint){
        this.object = this.generator(
            this.geometry,
            this.properties);
        this.object.type = "relation";
        this.object.modelReference = [this.originPoint.modelReference];
        this.object.hasExtremis = false;
        this.object.isOnScene = false;
        this.object.position = this.originPoint.position;
        this.object.change = RelationBuilder.changeExtremis;        
        this.object.update = RelationBuilder.updateRelation;
        this.object.change(extremisPoint);
        return this.object;
    }
}

RelationBuilder.changeExtremis = function(extremisPoint){
    this.extremis = extremisPoint;
    if(extremisPoint){
        this.modelReference[1] = extremisPoint.modelReference;
        this.update();            
        this.hasExtremis = true;          	        
    }    
};

RelationBuilder.updateRelation = function(){   
    var e = this.extremis; 
    var diff = new THREE.Vector3().copy(e.position).subSelf(this.position);
    var length = diff.length(), dir = diff.normalize();
    var axis = new THREE.Vector3(0,1,0).crossSelf(dir);
    var radians = Math.acos( new THREE.Vector3( 0, 1, 0 ).dot( dir.clone().normalize() ) );
    
    this.matrix = new THREE.Matrix4().makeRotationAxis( axis.normalize(), radians );
    this.rotation.getRotationFromMatrix( this.matrix, this.scale );
    this.scale.set( length, length, length );
}

