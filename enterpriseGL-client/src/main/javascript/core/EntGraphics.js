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
//        for(var i in this.scene.children){
//            var obj = this.scene.children[i];
//            if(obj instanceof THREE.Light) continue;
//            if(obj instanceof THREE.Camera) continue;
//            if(obj == this.plane) continue;
//            this.scene.remove(obj);
//        }
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
        this.updateRelations();
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
                //this.updateParticle(p);
            } else this.removeParticle(p)
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
        this.updateRelations();
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
        var p = this.context.elaborate(pEnt);  
        this.system.add(p)
        this.scene.add(p);        
        this.relations[pEnt.id] = [];
        var b = this.context.relationBuilder();
        // create relations
        b.reset(p);
        for(var ri in pEnt.relations){
            var pend = this.system.findParticle(pEnt.relations[ri]);
            var r = b.build(pend);
            if(!r.hasExtremis) r.modelReference[1] = pEnt.relations[ri];
            this.relations[pEnt.id].push(r);    
        }
    },
    
    updateRelations: function(){
        for(var entPid in this.relations){
            for(var j in this.relations[entPid]){
                var r = this.relations[entPid][j];
                if(!r.isOnScene){
                    // control if the relations has extremis   
                    if(!r.hasExtremis){
                        var p = this.system.findParticle(r.modelReference[1]);
                        // control if change function can be executed
                        if(!p) continue;
                        r.change(p);
                    }
                    this.scene.add(r);
                    r.isOnScene = true;
                }
                // update position
                r.update();
            }
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