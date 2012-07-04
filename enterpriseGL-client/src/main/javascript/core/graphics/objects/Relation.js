/**
 * Class for relation graphics element
 */
function Relation() {
    
}

Relation.prototype =  {
    generator: function(geom,prop){
        var color = { color: 0xFF33FF };
        if(prop.color) color = {color: prop.color};
        if(!prop.material){
            prop.material = new THREE.LineBasicMaterial( color );
        }
        var object = new THREE.Line(geom, prop.material);
        object.setExtremis = Relation.setExtremis;
        return object;
    },

    geometry: function(){
        var lineGeometry = new THREE.Geometry();
        lineGeometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
        lineGeometry.vertices.push( new THREE.Vector3( 0, 1, 0 ) );
        return lineGeometry;
    }
}

Relation.setExtremis = function(p1,p2){
    this.position = new THREE.Vector3( p1.x, p1.y, p1.z );
    var diff = new THREE.Vector3(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
    var length = diff.length();
    var dir = diff.normalize();
    var axis = new THREE.Vector3(0,1,0).crossSelf(dir);
    var radians = Math.acos( new THREE.Vector3( 0, 1, 0 ).dot( dir.clone().normalize() ) );

    this.matrix = new THREE.Matrix4().makeRotationAxis( axis.normalize(), radians );
    this.rotation.getRotationFromMatrix( this.matrix, this.scale );
    this.scale.set( length, length, length );
};