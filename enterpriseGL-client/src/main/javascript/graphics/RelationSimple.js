/**
 * Class for relation graphics element
 */
function RelationSimple(r) {
    var p1 = r.source, p2 = r.destination;
    var lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push( new THREE.Vector3( p1.x, p1.y, p1.z ) );
    lineGeometry.vertices.push( new THREE.Vector3( p2.x, p2.y, p2.z ) );
    THREE.Line.call( this, lineGeometry, new THREE.LineBasicMaterial( { color: 0xFF33FF } ) );    
    this.relation = r;
}

RelationSimple.prototype = new THREE.Line();
RelationSimple.prototype.constructor = RelationSimple;

