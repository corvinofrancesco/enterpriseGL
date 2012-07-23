/**
 * Costruisce le primitive delle particelle
 * @param sys sistema nel quale inserire la primitiva
 */
function ParticleBuilder(sys){
    this.geometry = null;
    this.generator = null;
    this.properties = null;
    this.system = sys;
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
        // select particle position
        object.modelReference = p.id;
        object.type = "particle";
        object.relations = p.relations;
        object.position = this.system.getFreeSpace(object);
        object.accelerations = new THREE.Vector3(0,0,0);
        object.velocity = new THREE.Vector3(0,0,0);
        return object;
    }
    
}

