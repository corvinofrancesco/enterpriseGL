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
        object.setExtremis = function (p1,p2){
            this.value = "a";
        };
        return object;
    },

    geometry: function(){
        var lineGeometry = new THREE.Geometry();
        lineGeometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
        lineGeometry.vertices.push( new THREE.Vector3( 0, 1, 0 ) );
        return lineGeometry;
    },
}