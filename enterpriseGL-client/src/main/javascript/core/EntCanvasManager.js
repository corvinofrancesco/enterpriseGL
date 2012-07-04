/**
 * Class used to load the enviroment: 
 * * graphics: set configurations for EntGraphics class; 
 * * user interfaces; 
 * * models and comunications;
 */
function EntCanvasManager(){
    var containerMng = new ContainerManager({
        info:"descriptionBox",
        main:"container"});

    this.model = new EntModel();

    this.graphics = new EntGraphics();
    
    this.model.init(this.graphics);

    containerMng.add(this.graphics.renderer.domElement);
    
    this.ui = new EntInteraction(this.graphics); 
    this.ui.containerManager = containerMng;
    
    EntCanvasManager.instance = this;
    EntCanvasManager.update();
}

EntCanvasManager.update = function(){
    requestAnimationFrame( EntCanvasManager.update );
    var instance = EntCanvasManager.instance;
    instance.ui.update();
    instance.graphics.update();    
}
    
