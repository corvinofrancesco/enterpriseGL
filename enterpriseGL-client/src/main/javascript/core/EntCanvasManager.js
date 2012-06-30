/**
 * Class used to load the enviroment: 
 * * graphics: set configurations for EntGraphics class; 
 * * user interfaces; 
 * * models and comunications;
 */
function EntCanvasManager(){
    this.container = document.createElement( 'div' );
    document.body.appendChild( this.container );

    this.mouse = new THREE.Vector2();
    this.offset = new THREE.Vector3();
    this.INTERSECTED = undefined;
    this.SELECTED = undefined;
    
    this.model = EntModel();

    this.graphics = new EntGraphics();

    this.container.appendChild( this.renderer.domElement);
    
    this.ui = new EntInteraction(this.graphics.renderer);    
}
 
EntCanvasManager.prototype = {
    setup: function () {
        this.renderer.render( this.scene, this.graphics.camera ); 
        update();

    },
        
    onDocumentMouseMove: function(event){
        event.preventDefault();
        enviroment.mouse.x = ( event.clientX / enviroment.graphics.width ) * 2 - 1;
        enviroment.mouse.y = - ( event.clientY / enviroment.graphics.height ) * 2 + 1;

        var obj = enviroment.graphics.getObjectOnView(enviroment.mouse);
        if(obj==null) return;
        log("muovo (" + enviroment.mouse.x +"," 
            + enviroment.mouse.y +") -> " +obj.object,"LOG",true);
          
    },
    
    onDocumentMouseDown: function(event){
        event.preventDefault();
        var obj = enviroment.graphics.getObjectOnView(enviroment.mouse);
        if(obj!=null) {
            enviroment.graphics.controls.enabled = false;
            enviroment.SELECTED = obj.object;
            
            enviroment.container.style.cursor = 'move';
        }
      
    },
    
    onDocumentMouseUp: function(event){
        event.preventDefault();
        enviroment.graphics.controls.enabled = true;
        
        enviroment.container.style.cursor = 'auto';
        
    },
    
}; 

function update(){
    
}
    
