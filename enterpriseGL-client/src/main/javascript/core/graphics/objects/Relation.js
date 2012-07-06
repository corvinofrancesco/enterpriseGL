/**
 * Class for relation graphics element
 */
function Relation() {
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
    lineGeometry.vertices.push( new THREE.Vector3( 0, 1, 0 ) );
    this.geometry=  lineGeometry;    
}

Relation.prototype =  {
    generator: function(geom,prop){
        var pcolor = { color: 0xFF33FF };
        if(prop.color) pcolor = {color: prop.color};
        var material = new THREE.LineBasicMaterial( pcolor );
        var object = new THREE.Line(geom, material);
        return object;
    },

}
