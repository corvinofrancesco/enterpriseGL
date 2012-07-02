/**
 * Class used to load the enviroment: 
 * * graphics: set configurations for EntGraphics class; 
 * * user interfaces; 
 * * models and comunications;
 */
function EntCanvasManager(){
    this.container = document.createElement( 'div' );
    document.body.appendChild( this.container );

    this.model = new EntModel();

    this.graphics = new EntGraphics();
    
    this.graphics.configureScene(this.model.system);

    this.container.appendChild( this.graphics.renderer.domElement);
    
    this.ui = new EntInteraction(this.graphics);    
    
    EntCanvasManager.instance = this;
    EntCanvasManager.update();
}

EntCanvasManager.update = function(){
    requestAnimationFrame( EntCanvasManager.update );
    var instance = EntCanvasManager.instance;
    instance.ui.update();
    instance.graphics.update();    
}
    
