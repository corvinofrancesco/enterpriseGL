/**
 * Draw a Cube Particle 
 */
function ParticleCube(p,type){
    var geometry = (type !== undefined)?type:ParticleCube.geometries.CUBE01;    
    var object = new THREE.Mesh( geometry, 
        new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
    object.material.ambient = object.material.color;
    object.position = new THREE.Vector3(p.x, p.y, p.z);
    object.rotation = new THREE.Vector3(0, 0, 0);
    object.scale = new THREE.Vector3(1, 1, 1);
    object.castShadow = true;
    object.receiveShadow = true;
    this.object = object;
    this.object.particle = p;
}

ParticleCube.geometries = {
    CUBE01: new THREE.CubeGeometry( 1, 1, 1 ),
    CUBE10: new THREE.CubeGeometry( 10, 10, 10 ),
    CUBE20: new THREE.CubeGeometry( 20, 20, 20 ),
    CUBE40: new THREE.CubeGeometry( 40, 40, 40 )
};
