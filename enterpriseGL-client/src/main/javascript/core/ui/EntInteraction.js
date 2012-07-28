/** 
 * Classe responsabilie dell'interazione con l'utente
 */
function EntInteraction(graphics){
    var dom = graphics.renderer.domElement;
    
    dom.addEventListener( 'mousemove', EntInteraction.onMouseMove, false );
    dom.addEventListener( 'mousedown', EntInteraction.onMouseDown, false );
    dom.addEventListener( 'mouseup', EntInteraction.onMouseUp, false );
    window.addEventListener( 'resize', EntInteraction.onResize, false );

    this.mouse = graphics.createMouseSelector();
    this.offset = new THREE.Vector3();
    this.intersectedElem = null;
    this.selectElem = null;
    this.graphicsManager = graphics;
    this.containerManager = null;
    
    EntInteraction.instance = this;
}

EntInteraction.changeModel = function(idModel){
    EntController.changeModel(idModel);
}

EntInteraction.onResize = function(event){
    var graphics= EntInteraction.instance.graphicsManager;
    graphics.resize(window.innerWidth,window.innerHeight );
    this.mouse = graphics.createMouseSelector();
}

EntInteraction.onMouseMove = function(event){
    event.preventDefault();
    
    var mouse = EntInteraction.instance.mouse;
    var graphics =  EntInteraction.instance.graphicsManager;
    var instance = EntInteraction.instance;
    
    mouse.update(event.clientX,event.clientY);
    
    if(instance.selectElem){ // muove elemento selezionato
        var posOnPlane = mouse.getPlane();        
        var pos = posOnPlane[0].point.subSelf(instance.offset);
        instance.moveObject(pos);
        return;        
    }
    
    var objsInPos = mouse.getObjects();
    if(objsInPos.length>0){
        // passaggio su un elemento differente dal precedente
        if(instance.intersectedElem != objsInPos[0].object){
            instance.passOverObject();
            instance.passOnObject(objsInPos[0].object);
      
            // orienta il piano per individuare l'intersezione 
            graphics.plane.position.copy( instance.intersectedElem.position );
            graphics.plane.lookAt( graphics.camera.position );        
        }
    } else {
        // nessun elemento sotto il mouse
        instance.passOverObject();
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
        instance.selectObject(objsInPos[0].object);
        var posOnPlane = mouse.getPlane();
        if(posOnPlane[0]){
            instance.offset.copy( posOnPlane[0].point )
                .subSelf( graphics.plane.position );            
        } else { /// il mouse non intercetta il piano
            
        }
    } 
    
};

EntInteraction.onMouseUp = function(event){
    event.preventDefault();

    var graphics =  EntInteraction.instance.graphicsManager;
    var instance = EntInteraction.instance;
    graphics.controls.enabled = true;
    
    if ( instance.intersectedElem ) {
        graphics.plane.position.copy( instance.intersectedElem.position );
    }
    instance.deselectObject();
};

EntInteraction.clickOnObject = function(id){
    var instance = EntInteraction.instance;
    if(instance.containerManager) {
        var str = EntObjects.getInfo(id);
        instance.containerManager.writeInfo(str);            
    }           
}

EntInteraction.prototype = {
    /**
     * Mouse over an object of graphics
     */
    passOnObject : function(object) {
        this.intersectedElem = object;
            
        // cambio del colore del materiale
        this.intersectedElem.currentHex = 
            this.intersectedElem.material.color.getHex();
        this.intersectedElem.material.color.setHex( 0xff0000 );
        
        EntInteraction.clickOnObject(object.modelReference);
    },
    
    /**
     * Funzione richiamata quando un oggetto precedentemente con il mouse di sopra
     * viene lasciato.
     */
    passOverObject : function(){
        // control the esistence of intersected element
        if ( !this.intersectedElem ) return;        
        var obj = this.intersectedElem;
        // ripristina il colore
        obj.material.color.setHex( obj.currentHex );
        // perde la traccia dell'elemento
        this.intersectedElem = null;        
        if(this.containerManager) {
            this.containerManager.hiddenInfo();
        }
    },
    
    selectObject: function(object){
        this.selectElem = object;
        EntInteraction.clickOnObject(object.modelReference);
        if(this.containerManager) {
            this.containerManager.container.style.cursor = 'move';
        }
    },
    
    deselectObject: function(){
        this.selectElem = null;
        if(this.containerManager) {
            this.containerManager.container.style.cursor = 'auto';
            this.containerManager.hiddenInfo();            
        }
    },
    
    moveObject: function(position){
        this.selectElem.position.copy(position);        
        if(this.containerManager) {
            this.containerManager.container.style.cursor = 'move';
        }
    },
    
    update : function(){
        
    }
}
