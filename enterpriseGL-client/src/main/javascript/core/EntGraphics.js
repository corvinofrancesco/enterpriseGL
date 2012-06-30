/**
 * Class used to load graphics elements of enterprise rapresentation
 */
function EntGraphics(configuration) {
    this.width = 800;
    this.height = 600;
    this.configuration = configuration?configuration:(new EntGraphicsConfig());

    this.scene = new THREE.Scene();
    // configure camera
    this.camera = configuration.cameraConfig(this.scene,this.width,this.height);
    // controls configurations
    this.controls = configuration.controlsConfig(this.camera);
    // light configurations
    this.scene.add( new THREE.AmbientLight( 0x505050 ) );
    this.scene.add(configuration.lightConfig(this.camera));    
    // plane configuration
    this.plane = new THREE.Mesh( 
        new THREE.PlaneGeometry( 2000, 2000, 8, 8 ), 
        new THREE.MeshBasicMaterial( 
            { color: 0x000000, opacity: 0.25, transparent: true, wireframe: true } )
    );
    this.plane.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
    this.plane.visible = false;
    this.scene.add( this.plane );    
    /// init projector
    this.projector = new THREE.Projector();
    /// init renderer
    this.renderer = new THREE.WebGLRenderer( {
        antialias: true
    } );
    this.renderer.sortObjects = false;
    this.renderer.setSize( this.width, this.height );
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapSoft = true;
    /// init objects
    this.objects = [];
}

EntGraphics.prototype = {
    
    configureScene: function(scene) {
        // particles insertion    
        var geometry = new THREE.CubeGeometry( 40, 40, 40 );
        for(var i in this.psystem.particles){
            var p = this.psystem.particles[i];
            var object = new THREE.Mesh( geometry, 
                new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
            object.material.ambient = object.material.color;
            object.position = {x: p.x, y: p.y, z: p.z};
            object.rotation = {x: 0.0, y: 0.0, z: 0.0};
            object.scale = {x: 1.2, y: 1.2, z:1.2};
            object.castShadow = true;
            object.receiveShadow = true;
            
            scene.add( object );
            this.objects.push( object );
            
        }
    },
    
    getObjectOnView: function(posxy){
        var vector = new THREE.Vector3( posxy.x, posxy.y, 0.5 );
        this.projector.unprojectVector( vector, this.camera );

        var ray = new THREE.Ray( this.camera.position, vector.subSelf( this.camera.position ).normalize() );

        var intersects = ray.intersectObjects( this.objects );
        if(intersects.length > 0) return intersects[0];
        return null;
    },
    
   
   /**
    * Update the graphics
    */
   update : function(){
       this.controls.update();
       this.renderer.render(this.scene,this.camera);
   }    
 
}

/**
 * Class for EntGraphics class configuration descriptions
 */
function EntGraphicsConfig(){
    
}

EntGraphicsConfig.prototype = {
   lightConfig: function(camera){
        var light = new THREE.SpotLight( 0xffffff, 1.5 );
        light.position.set( 0, 500, 2000 );
        light.castShadow = true;

        light.shadowCameraNear = 200;
        light.shadowCameraFar = camera.far;
        light.shadowCameraFov = 50;

        light.shadowBias = -0.00022;
        light.shadowDarkness = 0.5;

        light.shadowMapWidth = 1024;
        light.shadowMapHeight = 1024;
        return light;       
   },
   
   controlsConfig: function(camera){
        var controls = new THREE.TrackballControls( camera );
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;
        return controls;
   },
   
   cameraConfig: function(scene,w,h){
        this.camera = new THREE.PerspectiveCamera( 70, w/h, 1, 10000 );
        this.camera.position.z = 1000;
        scene.add( this.camera );       
   }
}