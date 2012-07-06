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
    this.scene.add(this.plane = configuration.planeConfig());
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
    /**
     * Getter required by mouse selector to intersect the elements in the scene
     */
    get objects(){
        return this.system.objects;
    },
    
    /**
     * Object used by @see EntInteraction class to manage the selections
     * of objects
     */
    createMouseSelector : function(){
        return new MouseSelector(this.camera,this.plane,this.system.objects,
        this.width,this.height);
    },    
   
    /**
     * Update the graphics
     * 
     * Function called by @see EntCanvasManager in the update function
     */
    update : function(){
        this.controls.update();
        this.system.update();
        this.renderer.render(this.scene,this.camera);
    },
   
    /**
     * Update the model from enterprise object
     * 
     * This method is called by @see EntModel when it have to change enterprise
     * objects rapresentations
     * 
     * @param entEventId identificator of enterprise event, so it can rapresent the modifications to be applied
     */
    updateModel : function(entEventId){
        var ev = EntObjects.get(entEventId);
        if(!ev) return; // if invalid event, exit
        var elements = (new Array()).concat(ev.objects);
        // control existent particles
        for(var i in this.system.particles){
            var p = ev.posInObjects(i);
            if(p!=-1){
                elements.split(p,1);
                //TODO send update event at system
                //this.system.event()
            } else {
                this.system.remove(this.system.particles[i]);
                this.scene.remove(this.system.particles[i]);
            }
        }
        // read particles only for passed event
        for(var i in elements){
            //var elem = EntObjects.get(elements[i]);
            var elem = elements[i];           
            if(elem){
                //elem = elem.getChange(entEventId);
                // manage system configuration and return primitives
                var p = this.context.elaborate(elem);  
                this.system.add(p)
                this.scene.add(p);
            }
        }
        // manage relations
//        for(var i in this.system.particles){
//            var p = this.system.particles[i];
//            for(var j in p.relations){
//                var idDest = p.relations[j];
//                var r = this.context.elaborate(p.modelReference,idDest);
//                this.relations.push(r);
//                this.scene.add(r);
//            }
//        }
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
    },
   
    planeConfig: function(){
        var plane = new THREE.Mesh( 
        new THREE.PlaneGeometry( 2000, 2000, 8, 8 ), 
        new THREE.MeshBasicMaterial( 
        { color: 0x000000, opacity: 0.25, transparent: true, wireframe: true } )
    );
        plane.geometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2 ) );
        plane.visible = false;
        return plane;
    }
   
}