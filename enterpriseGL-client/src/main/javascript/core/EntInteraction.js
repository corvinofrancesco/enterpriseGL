/** 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function EntInteraction(graphics){
    var dom = graphics.renderer.domElement;
    
    dom.addEventListener( 'mousemove', EntInteraction.onMouseMove, false );
    dom.addEventListener( 'mousedown', EntInteraction.onMouseDown, false );
    dom.addEventListener( 'mouseup', EntInteraction.onMouseUp, false );

    this.mouse = graphics.createMouseSelector();
    this.offset = new THREE.Vector3();
    this.intersectedElem = null;
    this.selectElem = null;
    this.graphicsManager = graphics;
    
    EntInteraction.instance = this;
}

EntInteraction.onMouseMove = function(event){
    event.preventDefault();
    
    var mouse = EntInteraction.instance.mouse;
    var graphics =  EntInteraction.instance.graphicsManager;
    var instance = EntInteraction.instance;
    
    mouse.update(event.clientX,event.clientY);
    
    if(instance.selectElem){
        var posOnPlane = mouse.getPlane();        
        instance.selectElem.position.copy( 
            posOnPlane[0].point.subSelf( instance.offset ) );
        return;        
    }
    
    var objsInPos = mouse.getObjects();
    if(objsInPos.length>0){
        // passaggio su un elemento differente dal precedente
        if(instance.intersectedElem != objsInPos[0].object){
            if ( instance.intersectedElem ) 
                instance.intersectedElem.material.color.setHex( 
                    instance.intersectedElem.currentHex );
            instance.intersectedElem = objsInPos[0].object;
            
            //TODO ripristino del colore del materiale
            instance.intersectedElem.currentHex = instance
                .intersectedElem.material.color.getHex();
            
            // orienta il piano per individuare l'intersezione 
            graphics.plane.position.copy( instance.intersectedElem.position );
            graphics.plane.lookAt( graphics.camera.position );        
        }
    } else {
        // nessun elemento sotto il mouse
        if ( instance.intersectedElem  ) {
            instance.intersectedElem.material.color
                .setHex( instance.intersectedElem.currentHex );
        }
        instance.intersectedElem = null;
        //container.style.cursor = 'auto';        
    }


};

EntInteraction.onMouseDown = function(event){
    event.preventDefault();

    var graphics =  EntInteraction.instance.graphicsManager;
    var mouse = EntInteraction.instance.mouse;
    var instance = EntInteraction.instance;
    
    var objsInPos = mouse.getObjects();
    if ( objsInPos.length > 0 ) {
        graphics.controls.enabled = false;

        instance.selectElem = objsInPos[0].object;
        var posOnPlane = mouse.getPlane();
        if(posOnPlane[0]){
            instance.offset.copy( posOnPlane[0].point )
                .subSelf( graphics.plane.position );            
        } else { /// il mouse non intercetta il piano
            
        }

        //container.style.cursor = 'move';

    } 
    
};

EntInteraction.onMouseUp = function(event){
    event.preventDefault();

    var graphics =  EntInteraction.instance.graphicsManager;
    var instance = EntInteraction.instance;
    graphics.controls.enabled = true;
    
    if ( instance.intersectedElem ) {
        graphics.plane.position.copy( instance.intersectedElem.position );
        instance.selectElem = null;
    }

    //container.style.cursor = 'auto';    
};

EntInteraction.prototype = {
    update : function(){
        
    }
}
