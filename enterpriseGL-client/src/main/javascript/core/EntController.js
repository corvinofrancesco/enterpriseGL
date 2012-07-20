/**
 * Class used to load the enviroment: 
 * * graphics: set configurations for EntGraphics class; 
 * * user interfaces; 
 * * models and comunications;
 */
function EntController(configurations){
    var containerMng = new ContainerManager({
        info:"descriptionBox",
        main:"container"});
    
    this.configuration = configurations || {};

    this.model = new EntModel();
    
    if(!configurations.defaultModel) SimulationLittleSystem();
    else configurations.defaultModel();

    this.graphics = new EntGraphics();
    
    this.model.init(this.graphics);

    containerMng.add(this.graphics.renderer.domElement);
    
    this.ui = new EntInteraction(this.graphics); 
    this.ui.containerManager = containerMng;
    
    EntController.instance = this;
    EntController.update();
}

EntController.update = function(){
    requestAnimationFrame( EntController.update );
    var instance = EntController.instance;
    instance.ui.update();
    instance.graphics.update();    
}

EntController.changeModel = function(idModel){
    var conf = EntController.instance.configuration;
    $.getJSON(conf.infoModelUrl(idModel), function(data){
        //TODO Configure the graphics builder with data received
    });
    EntController.instance.downloadIndex = 0;
    EntController.instance.downloadModel();
    EntController.instance.model.reset();
    EntController.instance.graphics.reset();
}

EntController.prototype = {    
    downloadModel: function(){
        var url = this.configuration.infoModelLoad(this.downloadIndex);
        var model = this.model;
        $.getJSON(url, function(data){
            // parse and elaborate data
            model.addObjects(data.items);
            // if download not already completed make callback
            if(!data.lastPacket) {
                EntController.instance.downloadModel();
            }
        });
        this.downloadIndex++;
    }
}