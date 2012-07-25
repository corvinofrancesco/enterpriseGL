function ParticleGeomPrimitive(){
    this.typePrimitive = null;
    this.colorMaterial = Math.random() * 0xffffff;
    this.element = null;    
}

ParticleGeomPrimitive.Primitive = {
    CUBE: "cube", SPHERE: "sphere"
}

ParticleGeomPrimitive.prototype = {
    create: function(){
        var material = new THREE.MeshLambertMaterial( { color: this.colorMaterial } );
        var object = null;
        switch(this.typePrimitive){
            case ParticleGeomPrimitive.Primitive.SPHERE:
                var radius = this.radius || 1,
                    segments = this.segments || 10,
                    rings = this.rings || 6;
                object = new THREE.Mesh(
                    new THREE.SphereGeometry(radius, segments, rings), 
                    material);
                break;
            default: 
            case ParticleGeomPrimitive.Primitive.CUBE: 
                var d = this.dimension || 1;
                object =new THREE.Mesh( 
                    new THREE.CubeGeometry(d, d, d), 
                    material);
                break;
        }
        object.rotation = new THREE.Vector3(0, 0, 0);
        object.scale = new THREE.Vector3(1, 1, 1);
        object.castShadow = true;
        object.receiveShadow = true;
        this.element = object;
        return object;        
    },
    
    
}