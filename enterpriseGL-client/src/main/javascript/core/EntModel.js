/**
 * Class for data model loading and comunication to the server
 */
function  EntModel(){
    this.loader = new Loader();
    this.loader.callback = this.update;
    this.graphics = null;
    this.currentEventId = "event0"; 
    new EntObjects();
    SimulationConeTree();
}

EntModel.prototype = {
    
    /**
     * Go to the init event of system
     */
    init : function(graphics){
        this.graphics = graphics;
        //TODO configure loader
        var firstEv = EntObjects.get(this.currentEventId);
        // try to visualize the first event
        if(firstEv) this.graphics.updateModel(this.currentEventId);
        else { // otherwise try to connect to the server
            this.loader.wait();
        }
    },
    
    /**
     * Go to an specific event 
     */
    goToEvent: function(eventId) {
        
    },
    
    /**
     * Go to the next event in memory if exist
     */
    playNextEvent: function(){
        
    },
    
    /**
     * Call back function for loader
     */
    update : function(){
    //        this.loader.wait();
    //        this.graphics.updateModel(this.currentEventId);
    },
    
    /**
     * Reset the enterprise objects
     */
    reset : function(){
        EntObjects.instance.objects = {};
    }
    
}
