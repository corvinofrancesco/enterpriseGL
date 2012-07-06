/**
 * This class specifics the stategies to visualize objects.
 * Convert an enterprise object in graphical primitive
 * Principal distinction is between Particles and Events
 */
function ModelConfiguration(sys){
    this.pbuilder = new ParticleBuilder(sys);
    this.rbuilder = new RelationBuilder(sys); 
    this.system = sys;    
}

ModelConfiguration.prototype = {
    elaborate: function(entPart){
        var p = this.pbuilder.build(entPart);
        return p;
    },
    
    elaborateRelation: function(entPart1, entPart2){
        var r = this.rbuilder.build(entPart1, entPart2);
        return r;
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