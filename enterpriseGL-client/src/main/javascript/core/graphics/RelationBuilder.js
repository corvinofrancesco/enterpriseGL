/**
 * Permette di definire le primitive delle relazioni
 */
function RelationBuilder(sys){
    this.geometry = null;
    this.generator = null;
    this.properties = null; 
    this.system = sys;
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
        // TODO cerca le primitive delle due particelle 
        object.setExtremis(p1,p2);// = new THREE.Vector3(p1.x, p1.y, p1.z);
        object.modelReference = p1.id;
        object.type = "relation";
        return object;
    }
}

