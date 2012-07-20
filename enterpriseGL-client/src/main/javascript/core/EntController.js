/**
 * Class used to load the enviroment: 
 * * graphics: set configurations for EntGraphics class; 
 * * user interfaces; 
 * * models and comunications;
 */
function EntController(configuration){
    var containerMng = new ContainerManager({
        info:"descriptionBox",
        main:"container"});
    
    this.model = new EntModel();
    this.graphics = new EntGraphics();
    containerMng.add(this.graphics.renderer.domElement);    
    this.ui = new EntInteraction(this.graphics); 
    this.ui.containerManager = containerMng;
    // control configuration    
    this.configuration = configuration || {};
    if(!this.configuration.defaultModel) 
        this.configuration.defaultModel = SimulationLittleSystem;
    // save singleton instance
    EntController.instance = this;
    // start model
    this.configuration.defaultModel();
    // start updates
    EntController.update();
}

EntController.update = function(){
    requestAnimationFrame( EntController.update );
    var instance = EntController.instance;
    instance.ui.update();
    if(instance.model.hasChange()){
        instance.graphics.updateModel(
            instance.model.currentEventId);
    }
    instance.graphics.update();    
}

EntController.changeModel = function(idModel){
    var conf = EntController.instance.configuration;
    // clear old data
    EntController.instance.model.reset();
    EntController.instance.graphics.reset();
    // prepare configuration
    if(conf.infoModelUrl){
        $.getJSON(conf.infoModelUrl(idModel), function(data){
            //TODO Configure the graphics builder with data received
        });        
    } else conf.defaultModel();
    // prepare download
    if(conf.infoModelLoad){
        EntController.instance.downloadIndex = 0;
        EntController.instance.downloadModel();        
    }
}

EntController.prototype = {    
    downloadModel: function(){
        var url = this.configuration.infoModelLoad(this.downloadIndex);
        var model = this.model;
        $.getJSON(url, function(data){
            // parse and elaborate data
            model.addObjects(data.items);
            if(!data.idPacket==0){
                // set the timeline to the first event
                EntController.instance.model.init();                
            }
            // if download not already completed make callback
            if(!data.lastPacket) {
                EntController.instance.downloadModel();
            }
        });
        this.downloadIndex++;
    }
}