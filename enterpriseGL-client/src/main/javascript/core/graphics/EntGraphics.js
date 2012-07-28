/**
 * Class used to load graphics elements of enterprise rapresentation
 */
function EntGraphics(configuration) {
    this.width = 800;
    this.height = 600;    

    if(!configuration) configuration =new EntGraphicsConfig();
    this.configuration = configuration;

    /// init renderer
    this.renderer = new THREE.WebGLRenderer( {
        antialias: true
    } );
    this.renderer.sortObjects = false;
    this.renderer.setSize( this.width, this.height );
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapSoft = true;
    
    /// configure scene
    this.scene = new THREE.Scene();
    // configure camera
    this.camera = configuration.cameraConfig(this.scene,this.width,this.height);
    // controls configurations
    this.controls = configuration.controlsConfig(this.camera, this.renderer.domElement);
    // light configurations
    this.scene.add( new THREE.AmbientLight( 0x505050 ) );
    this.scene.add(configuration.lightConfig(this.camera));    
    // plane configuration
    this.scene.add(this.plane = configuration.planeConfig());
    /// init projector
    this.projector = new THREE.Projector();
    /// init objects
    this.system = new GraphicalSystem();
    
    this.settings = new GraphicalSettings();
    var settingDefault = new EntGL.SettingsDefault();
    this.settings.addSettings(settingDefault.popolate());//EntSetting.defaultValues());
    
    this.relations = {};
}

EntGraphics.prototype = {
    
    /**
     * Getter required by mouse selector to intersect the elements in the scene
     */
    get objects(){
        return this.system.objects;
    },
    
    /**
     * Remove all painted object in the scene
     */
    reset: function(){
        for(var i in this.system.particles){
            var id = this.system.particles[i];
            this.removeParticle(id);
        }
        this.system = new GraphicalSystem();
        this.settings.clearDiedEvents();
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
        //this.updateRelations();
        var events = this.settings.getEvents(), i = 0;
        while(events.length>0){
            var curr = events.shift();
            if(curr.isDied()) {
                //this.settings.remove(i);
            }
            else curr.applyOn(this.scene,this.system);
            i++;
        }
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
                elements.splice(p,1);
                var gPart = EntObjects.get(p);
                this.settings.register(GraphicalSettings.EventType.UPDATE,gPart);
                //this.updateParticle(p);
            } else {
                var gPart = EntObjects.get(p);
                this.settings.register(GraphicalSettings.EventType.REMOVE,gPart);                
                //this.removeParticle(p);
            }
        }
        // read particles only for passed event
        for(var i in elements){
            var elem = EntObjects.get(elements[i]);
            //var elem = elements[i];           
            if(elem) {
                //TODO get current element
                //elem = elem.getChange(entEventId);
                this.addParticle(elem);
            }
        }
        //this.updateRelations();
    },
    
    updateParticle: function(p){
        //TODO send update event at system
        //this.system.event()        
        //TODO control if there is new relations
    },
    
    /**
     * Remove a particle from scene and system.
     * 
     * @param p is the primitive of the particle, but the function retrive 
     * for security the primitive from system.
     */
    removeParticle: function(p){
        var gPart = this.system.particles[p.modelReference];
        this.system.remove(p.modelReference);
        this.scene.remove(gPart);
        // remove relations from scene
        for(var ri in this.relations[p.modelReference]){
            var r = this.relations[p.modelReference][ri];
            if(r.isOnScene) this.scene.remove(r);
        }
        this.relations[p.modelReference] = undefined;
    },
    
    addParticle: function(pEnt){
        // manage system configuration and return primitives
        var result = this.settings.register(
            GraphicalSettings.EventType.ADD,pEnt);
        if(result==null) return;
        for(var ri in pEnt.relations){
            var relation = new EntRelation(pEnt.id, pEnt.relations[ri]);
            //TODO set source and destination
            this.settings.register( GraphicalSettings.EventType.ADD,relation);
            //this.relations[pEnt.id].push(r);    
        }
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
        light.position.set( 0, 5, 20 );
        light.castShadow = true;

        light.shadowCameraNear = 2;
        light.shadowCameraFar = camera.far;
        light.shadowCameraFov = 20;

        light.shadowBias = -0.00022;
        light.shadowDarkness = 0.5;

        light.shadowMapWidth = 1024;
        light.shadowMapHeight = 1024;
        return light;       
    },
   
    controlsConfig: function(camera, domElement){
        var controls = new THREE.TrackballControls( camera, domElement );
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