/**
 * Class for relation graphics element
 */
var RelationBase  = function () {
    this.geometry = RelationBase.defaultGeometry;    
    this.entRelation = null;
    this.lineColor = { color: 0xFF33FF };
    this.material = new THREE.LineBasicMaterial( this.lineColor );
    this.element = null;
}

RelationBase.defaultGeometry = new THREE.Geometry();
RelationBase.defaultGeometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
RelationBase.defaultGeometry.vertices.push( new THREE.Vector3( 0, 1, 0 ) );

RelationBase.prototype =  {
    createElement: function(){
        this.element = new THREE.Line(this.geometry, this.material);        
    },
    
    create: function(){
        
        if(this.entRelation==null){
            return null;
        }
        if(this.element==null){
            return null; //this.createElement();
        }
        return this.element;
    },
    
    linkToModel: function(entRelation){
        this.entRelation = entRelation;
        if(this.element==null) this.createElement();
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
    
    update: function(Source, Dest){
        if(Dest==null) return;
        var pSource = Source.position, pDest = Dest.position;
        this.element.position = pSource;
        var diff = pDest.clone().subSelf(pSource);
        var length = diff.length(), dir = diff.normalize();
        var axis = new THREE.Vector3(0,1,0).crossSelf(diff);
        var radians = Math.acos( new THREE.Vector3( 0, 1, 0 ).dot( dir ) );

        this.element.matrix = new THREE.Matrix4().makeRotationAxis( axis.normalize(), radians );
        this.element.scale.set( length, length, length);
        this.element.rotation.getRotationFromMatrix( this.element.matrix );
    },
    
    getElement: function(){
        return this.element;
    }

}
