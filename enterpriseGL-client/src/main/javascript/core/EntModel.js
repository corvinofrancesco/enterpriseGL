/**
 * Class for data model loading and comunication to the server
 */
function  EntModel(){
    this.loader = new Loader();
    this.graphics = null;
    this.currentEventId = "event0"; 
    new EntObjects();
    Simulation();
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
        
    },
    
    /**
     * Reset the enterprise objects
     */
    reset : function(){
        EntObjects.instance.objects = {};
    },
    
}


/*******************************************************************************
 * Simulation
 */
function Simulation(){    
    var event0 = new EntEvent();
    var part1 = new EntParticle(), 
        part2 = new EntParticle(), 
        part3 = new EntParticle(),
        part4 = new EntParticle(),
        part5 = new EntParticle();

    part1.setProperties({
        id: 'part1',
        title: "Particella 01",
        body: "Particella d'esempio numero 01",
        relations: ['part2','part3']    
    }); part1.register();

    part2.setProperties({
        id: 'part2',
        title: "Particella 02",
        body: "Particella d'esempio numero 02",
        relations: ['part3']    
    }); part2.register();

    part3.setProperties({
        id: 'part3',
        title: "Particella 03",
        body: "Particella d'esempio numero 03",
        relations: []    
    }); part3.register();

    part4.setProperties({
        id: 'part4',
        title: "Particella 04",
        body: "Particella d'esempio numero 04",
        relations: ['part1','part2']    
    }); part4.register();

    part5.setProperties({
        id: 'part5',
        title: "Particella 05",
        body: "Particella d'esempio numero 05",
        relations: ['part3','part2']    
    }); part5.register();

    event0.setProperties({
        id: 'event0',
        nametime: new Date(),
        descriptio: "A fist event for testing graphical system",
        objects: [part1, part2, part3,part4,part5]
    }); event0.register();
}
