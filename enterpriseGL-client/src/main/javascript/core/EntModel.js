/**
 * Class for data model loading and comunication to the server
 */
function  EntModel(){
    this.timeline = [];
    this.loader = new Loader();
    this.loader.callback = this.update;
    this.graphics = null;
    this.currentEventId = "event0"; 
    this.currentEventPos = 0;
    new EntObjects();
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
     * @return the array of events order by crescent data
     */
    getTimeLine: function() {
        this.timeline = EntObjects.instance.getEvents();
        return this.timeline.sort(function(a,b){
            return (a.date > b.date)-(a.date < b.date);
        });        
    },
    
    /**
     * @return the next event in memory if exist
     */
    getNextEvent: function(){
        if(this.timeline.length<=this.currentEventPos) {
            // we are in the last event
            return this.currentEventId;
        }
        var next = this.currentEventPos+1;
        return this.timeline[next].id;
    },
    
    /**
     * @return the precedent event in memory if exist
     */
    getPrevEvent: function(){
        if(this.currentEventPos<=0) {
            // we are in the first event
            return this.currentEventId;
        }
        var prec = this.currentEventPos-11;
        return this.timeline[prec].id;        
    },
    
    /**
     * 
     * @param eventId identification of event to set
     * @param pos order of event expected (optional)
     * @return the number of order of event setted
     */
    setToEvent: function(eventId,pos){
        // control if the event is valid
        if(EntObjects.get(eventId)){
            this.currentEventId = eventId;
            if(pos){
                if(this.timeline[pos].id == eventId){
                    this.currentEventPos = pos;                            
                    return pos;
                }
            }
            // search position in timeline
            for(var i in this.timeline)
                if(this.timeline[i].id == eventId){
                    this.currentEventPos = i;
                    return i;
                }
        }
        return null;
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
    },
    
    /**
     * 
     */
    addObjects: function(objects){
        for(var i in objects){
            var obj = null;
            switch(objects[i].type){
                case "particle": obj = new EntParticle(); break
                case "event": obj = new EntEvent(); break;
                default: continue; // go to next item
            }
            obj.setProperties(objects[i]);
            obj.register();
        }
    }
    
}
