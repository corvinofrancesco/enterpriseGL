/**
 * This class manage the enterprise data loading
 */
function Loader(){
    this.callback = EntModel.update;
    // set true when data from model is updated
    this.updated = false;
}

Loader.prototype = {
    /**
     * Start comunications for data exchange
     */
    setup : function() {
        //TODO implement initialization of comunication with server here
        
    },
    
    /**
     * Request for updates and wait response
     */
    wait : function(){
        //TODO implement ajax request to the server and callback         
    },
    
    isUpdated: function(){
        return this.updated;
    }
    
}
