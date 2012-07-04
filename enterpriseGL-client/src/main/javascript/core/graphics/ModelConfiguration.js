/**
 * Specifica le stategy di visualizzazione degli oggetti
 */
function ModelConfiguration(){
    this.pbuilder = new ParticleBuilder();
    this.rbuilder = new RelationBuilder();
}

ModelConfiguration.prototype = {
    getPrimitiveFor : function(object){
        if(object.type=="particle") return this.getParticleFor(object);
        else return this.getRelationFor(object);
    },
    
    getParticleFor : function(p){
        var primitive = new ParticleCube(p);
        return primitive.object;
    },
    
    getRelationFor : function(r){
        var primitive = new RelationSimple(r);
        return primitive;
    }
}