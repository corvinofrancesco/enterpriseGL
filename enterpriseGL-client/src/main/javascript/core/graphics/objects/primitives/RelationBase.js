/**
 * Class for relation graphics element
 */
function RelationBase() {
    this.geometry = RelationBase.defaultGeometry;    
    this.entRelation = null;
    this.lineColor = { color: 0xFF33FF };
    this.material = new THREE.LineBasicMaterial( this.lineColor );
    this.element = new THREE.Line(this.geometry, this.material);
}

RelationBase.defaultGeometry = new THREE.Geometry();
RelationBase.defaultGeometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
RelationBase.defaultGeometry.vertices.push( new THREE.Vector3( 0, 1, 0 ) );

RelationBase.SimpleAddingSetting = function(){
   var retSet = new EntSetting(null,function(event,scene,element,system){
        if(element instanceof EntElement){
            // creation of element
            var primitive = new RelationBase();
            primitive.linkToModel(element);
            if(primitive.create()==null) return;
            event._element = primitive;
            event.settingGen = "createParticleGeom";
            scene.add(primitive.getElement());
            system.add(primitive.getElement())
            return;
        }            
    });
    retSet.elementType =  EntGL.ElementType.RELATION;
    retSet.id = "createSimpleRelation";
    return retSet;     
}

RelationBase.prototype =  {
    create: function(){
        
        if((this.element!=null) && (this.entRelation!=null)){
            this.linkToModel(this.entParticle);
        }
        return this.element;
    },
    
    linkToModel: function(entRelation){
        this.entRelation = entRelation;
        if(this.element==null) return;
        this.element.modelReference = 
            [ this.entRelation.idSource, this.entRelation.idDestination ];
        this.element.position = new THREE.Vector3(0,0,0);
    },
        
    changeExtremis: function(entRelation){
        this.linkToModel(entRelation);
    },
    
    update: function(pSource, pDest){
        if(pDest==null) return;
        this.element.position = pSource;
        var diff = pDest.clone().subSelf(pSource);
        var length = diff.length(), dir = diff.normalize();
        var axis = new THREE.Vector3(0,1,0).crossSelf(diff);
        var radians = Math.acos( new THREE.Vector3( 0, 1, 0 ).dot( dir ) );

        this.element.matrix = new THREE.Matrix4().makeRotationAxis( axis.normalize(), radians );
        this.element.scale.set( length, length, length);
        this.element.rotation.getRotationFromMatrix( this.matrix );
    }

}
