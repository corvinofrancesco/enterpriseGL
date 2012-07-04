/**
 * Permette di definire le primitive delle relazioni
 */
function RelationBuilder(){
    this.geometry = null;
    this.generator = null;
    this.properties = null;    
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
    
    build : function(p1,p2){
        var object = this.generator(this.geometry,this.properties);
        object.position = new THREE.Vector3(p1.x, p1.y, p1.z);
        object.modelReference = p1.id;
        return object;
    }
}

