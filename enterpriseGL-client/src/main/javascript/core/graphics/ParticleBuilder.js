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
        var pos = null;
        if(p.relations.length>0){
            for(var i in p.relations){
                pos = this.system.getSpaceNextTo(p.relations[i]);
                if(pos != null) break;
            }
        } 
        if(pos==null) pos = this.system.getFreeSpace();
        object.position = pos;
        object.modelReference = p.id;
        object.type = "particle";
        return object;
    }
    
}

