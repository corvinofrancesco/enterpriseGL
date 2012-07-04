/**
 * Class for data model loading and comunication to the server
 */
function  EntModel(){
    this.loader = new FixedParticles();
}

EntModel.prototype = {
    /**
     * Imposta il contesto di creazione della grafica 
     */
    setup : function(context){
        this.contex = context;
    },
    
    init : function(graphics){
        this.loader.popolate(graphics.system);
        for(var i in this.system.particles){
            var p = this.system.particles[i];
            // select the primitive type
            var obj = this.context.getParticleFor(p);
            graphics.add(obj);
        }
        
        for(var j in this.system.relations){
            var r = this.system.relations[j];
            var p1 = this.system.particles[r.idS];
            var p2 = this.system.particles[r.idD];
            r.source = p1;
            r.destination = p2;
            // select the primitive type
            var rObj = this.context.getRelationFor(r);
            graphics.add(rObj);
        }
        
    },
    
    update : function(graphics){
        
    }
}

/**
 * Specifica le stategy di visualizzazione degli oggetti
 */
function ModelConfiguration(){
    
}

ModelConfiguration.prototype = {
    getParticleFor : function(p){
        var primitive = new ParticleCube(p);
        return primitive.object;
    },
    
    getRelationFor : function(r){
        var primitive = new RelationSimple(r);
        return primitive;
    }
}