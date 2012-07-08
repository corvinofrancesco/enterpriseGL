/**
 * Draw a Star Particle
 */
function ParticleStar(){
    this.geometry = new THREE.Geometry();
    this.geometry.vertices.push(new THREE.Vector3(0,0,0));
}

ParticleStar.prototype = {
    generator: function(geom, prop){
        var sprite = THREE.ImageUtils.loadTexture( "ball.png" );
//        var sprite = THREE.ImageUtils.loadTexture( "snowflake1.png" );
        var color = [0.2,0.5,0.9];
        var size = 20;
        var material = new THREE.ParticleBasicMaterial({
            size: size,
            map: sprite,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent : false 
        });
        material.color.setHSV(
            color[0],
            color[1],
            color[2]);
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(0,0,0));
        var p = new THREE.ParticleSystem(geometry,material); 
        p.constructor = THREE.Particle;
        p.scale = new THREE.Vector3(1,1,1);
//        var p = new THREE.Particle(material); 

        return p;
    }
}