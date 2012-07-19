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
    
    this.configuration = configurations | {};

    this.model = new EntModel();

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
    
EntController.prototype = {
    getJson: function(url){
        
    },
    
    changeModel: function(){
        var infoModel = $.ajax({
            url:this.configuration.infoModelUrl,
            
        });
    }
}