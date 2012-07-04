/**
 * Class for data model loading and comunication to the server
 */
function  EntModel(){
    this.loader = new FixedParticles();
}

EntModel.prototype = {
    /**
     * Imposta il contesto di creazione della grafica 
     */
    setup : function(context){
        this.contex = context;
    },
    
    init : function(graphics){
        this.loader.popolate(graphics.system);        
    },
    
    update : function(graphics){
        
    }
}
