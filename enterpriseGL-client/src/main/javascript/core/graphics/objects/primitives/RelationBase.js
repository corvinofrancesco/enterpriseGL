/**
 * Class for relation graphics element
 */
var RelationBase  = function () {
    this.geometry = RelationBase.defaultGeometry;    
    this.entRelation = null;
    this.lineColor = { color: 0xFF33FF };
    this.material = new THREE.LineBasicMaterial( this.lineColor );
    this.element = new THREE.Line(this.geometry, this.material);
}

RelationBase.defaultGeometry = new THREE.Geometry();
RelationBase.defaultGeometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
RelationBase.defaultGeometry.vertices.push( new THREE.Vector3( 0, 1, 0 ) );

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
    
    getElemInSystem: function(system){
        var idS,idD, ret = [null,null];
        try {
            idS = this.entRelation.idSource;
            idD = this.entRelation.idDestination;
            ret[0] = system.particles[idS];
            ret[1] = system.particles[idD];
        } catch(e){}
        return ret;
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
