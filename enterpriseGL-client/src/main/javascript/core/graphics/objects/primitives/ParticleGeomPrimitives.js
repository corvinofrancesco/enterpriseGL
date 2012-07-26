ParticleGeomPrimitive.prototype = new ParticleBase();
ParticleGeomPrimitive.constructor = ParticleGeomPrimitive;
ParticleGeomPrimitive.superclass = ParticleBase.prototype;

function ParticleGeomPrimitive(){
    this.typePrimitive = null;
    this.colorMaterial = Math.random() * 0xffffff;
    this.typeMaterial = null;
}

ParticleGeomPrimitive.Primitive = {
    CUBE: "cube", SPHERE: "sphere"
}

ParticleGeomPrimitive.Material = {
    LAMBERT: "lambert", PHONG: "phong"
}

ParticleGeomPrimitive.prototype.create = function(){
    var material = null, object = null;
    switch(this.typeMaterial){
        case ParticleGeomPrimitive.Material.PHONG:
            material = new THREE.MeshPhongMaterial( { color: this.colorMaterial } );
            break
        case ParticleGeomPrimitive.Material.LAMBERT: 
        default: 
            material = new THREE.MeshLambertMaterial( { color: this.colorMaterial } );
    }
    switch(this.typePrimitive){
        case ParticleGeomPrimitive.Primitive.SPHERE:
            var radius = this.radius || 0.7,
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
    return ParticleGeomPrimitive.superclass.create.call(this);        
}