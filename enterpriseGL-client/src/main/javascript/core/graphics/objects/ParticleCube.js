/**
 * Draw a Cube Particle 
 */
function ParticleCube(){
    
}

ParticleCube.prototype = {
    geometries: {
        CUBE01: new THREE.CubeGeometry( 1, 1, 1 ),
        CUBE10: new THREE.CubeGeometry( 10, 10, 10 ),
        CUBE20: new THREE.CubeGeometry( 20, 20, 20 ),
        CUBE40: new THREE.CubeGeometry( 40, 40, 40 )
    },

    generator: function(geom,prop) {
        var material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } );
        var object = new THREE.Mesh( geom, material);
        object.material.ambient = object.material.color;
        object.rotation = new THREE.Vector3(0, 0, 0);
        object.scale = new THREE.Vector3(1, 1, 1);
        object.castShadow = true;
        object.receiveShadow = true;
        return object;
    }
};