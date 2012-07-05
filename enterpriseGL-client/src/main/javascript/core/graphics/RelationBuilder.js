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
    
    build : function(entPart1,entPart2){
        var p1, p2,
            object = this.generator(this.geometry,this.properties);
        // TODO cerca le primitive delle due particelle
        if(this.system){
            p1 = this.system.findParticle(entPart1);
            p2 = this.system.findParticle(entPart2);
        }
        object.modelReference = [entPart1.id, entPart2.id];
        object.type = "relation";
        if(p1==null || p2==null){
            object.updated = false;
        } else {
            object.setExtremis(p1,p2);
            object.updated = true;
        }
        return object;
    }
}

