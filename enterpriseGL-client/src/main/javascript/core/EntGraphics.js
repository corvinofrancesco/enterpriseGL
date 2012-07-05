/**
 * Class used to load graphics elements of enterprise rapresentation
 */
function EntGraphics(configuration) {
    this.width = 800;
    this.height = 600;    

    if(!configuration) configuration =new EntGraphicsConfig();
    this.configuration = configuration;
    
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
    this.system = new GraphicalSystem();
    // strategy for objects creation
    this.context = new ModelConfiguration(this.system);
    this.context.configure({});
}

EntGraphics.prototype = {
    get objects(){
        return this.system.objects;
    },
    
    /**
     * Add an object to the scene
     */
    add: function(entObject){
        var objs = this.context.getPrimitivesFor(entObject);
        for(var i in objs){
            var obj = objs[i];
            this.scene.add(obj);            
            if(obj.type=="particle"){
                this.system.add(obj);            
                //this.objects.push(object);                
            }
        }
    },
    
    remove: function(object){
        this.scene.remove(object);  
        // rimuove l'oggetto dall'array degli oggetti
        for(var i =0;i<this.objects.length; i++){
            if(this.objects[i].id == object.id){
                this.objects.splice(i,1);
                return;
            }
        }
    },
    
    createMouseSelector : function(){
        return new MouseSelector(this.camera,this.plane,this.objects,
            this.width,this.height);
    },    
   
   /**
    * Update the graphics
    */
   update : function(){
       this.controls.update();
       this.system.update();
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
        var camera = new THREE.PerspectiveCamera( 70, w/h, 1, 10000 );
        camera.position.z = 10;
        scene.add(camera );       
        return camera;
   }
}