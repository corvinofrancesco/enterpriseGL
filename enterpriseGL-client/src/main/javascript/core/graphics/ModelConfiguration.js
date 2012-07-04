/**
 * Specifica le stategy di visualizzazione degli oggetti
 */
function ModelConfiguration(sys){
    this.pbuilder = new ParticleBuilder(sys);
    this.rbuilder = new RelationBuilder(sys);            
}

ModelConfiguration.prototype = {
    /**
     * Convert an enterprise object in graphical primitive
     * Distinction principal distinction is between Particles and Events
     * @param entObject object that it convert
     * @return array of primitives
     */
    getPrimitivesFor : function(entObject){
        var objects = [];
        if(entObject instanceof EntParticle) {
            objects.push( this.getParticleFor(entObject));            
        } else if(entObject.objects){
            for(var i in entObject.objects){
                var subEntObject = EntObjects.get(entObject.objects[i]);
                if(subEntObject){
                    objects.push( this.getRelationFor(entObject));                                
                }
            }
        }
        return this.objects;
    },
    
    /**
     * @param entPart the enterprise particle to be elaborated
     * @param changeTimeId the time to consider, if null find last change
     */    
    getParticleFor : function(entPart, changeTimeId){
        var objects = [];
        if(changeTimeId){
            entPart = entPart.getChange(changeTimeId);
        }
        objects.push(this.pbuilder.build(entPart));
        for(var r in entPart.relations){
            objects.push(this.rbuilder.build(entPart, entPart.relations[r]));
        }
        return objects;
    },
    
    configure: function(props){
        //TODO configure builder in function of props
        var pModel = new ParticleCube();
        this.pbuilder.setGeometry(pModel.geometries.CUBE01);
        this.pbuilder.setGenerator(pModel.generator);
        this.pbuilder.setProperties(props);
        var rModel = new Relation();
        this.rbuilder.setGeometry(rModel.geometry);
        this.rbuilder.setGenerator(rModel.generator);
        this.rbuilder.setProperties(props);
    }
}