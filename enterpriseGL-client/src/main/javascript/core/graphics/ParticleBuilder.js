/**
 * Costruisce le primitive delle particelle
 */
function ParticleBuilder(){
    this.geometry = null;
    this.generator = null;
    this.properties = null;
}

ParticleBuilder.prototype = {
    setGeometry : function (geometry) {
        this.geometry = geometry;
    },
    
    setGenerator : function (generator) {
        this.generator = generator;
    },
    
    setProperties : function (properties){
        this.properties = properties;
    },
    
    build : function(p){
        var object = this.generator(this.geometry,this.properties);
        object.position = new THREE.Vector3(p.x, p.y, p.z);
        object.modelReference = p.id;
        return object;
    }
    
}

