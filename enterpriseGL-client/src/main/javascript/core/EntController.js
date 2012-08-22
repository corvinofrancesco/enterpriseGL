/**
 * Class used to load the enviroment: 
 * * graphics: set configurations for EntGraphics class; 
 * * user interfaces; 
 * * models and comunications;
 */
EntGL.Controller = {
    configuration: {
        defaultModel: function(){}, //SimulationLittleSystem
        infoModelLoad: function(id){return "load/download/" + id;},
        infoModelUrl: function(model){return "load/config/" + model;},
        panels: {
            enable: false,
            list: [],
            mainPanel: null
        }        
    },
    
    registerCommand: function(command){
        this.commands[command.id] = command;  
    },
    
    invoke: function(command){
        if(this.commands[command])
            this.command[command].execute();
    },
    
    completeDownload :function(){
        // set the timeline to the first event
        EntGL.Controller.model.init();                
        var graphic = EntGL.Controller.graphics,
            event = EntGL.Controller.model.currentEventId;
        graphic.updateModel(event);
        EntGL.Controller.ui.mouse 
            = graphic.createMouseSelector();
    },
    downloadModel: function(){
        var url = this.configuration.infoModelLoad(this.downloadIndex),
            model = this.model;
        $.getJSON(url, function(data){
            // parse and elaborate data
            model.addObjects(data.items);
            if(!data.idPacket==0){
            }
            // if download not already completed make callback
            if(!data.lastPacket) {
                EntGL.Controller.downloadModel();
            } else EntGL.Controller.completeDownload();
        });
        this.downloadIndex++;
    },
    changeModel: function(idModel){
        var conf = EntGL.Controller.configuration;
        // clear old data
        EntGL.Controller.model.reset();
        EntGL.Controller.graphics.reset();
        // prepare configuration
        if(conf.infoModelUrl){
            $.getJSON(conf.infoModelUrl(idModel), function(data){
                //TODO Configure the graphics builder with data received
                EntGL.Controller.graphics.system.changeDistribution(
                    DistributionAlg.Algoritms(data.typeDiagram));
            });        
        } else conf.defaultModel();
        // prepare download
        if(conf.infoModelLoad){
            EntGL.Controller.downloadIndex = 0;
            EntGL.Controller.downloadModel();        
        }
    },
    update: function(){
        requestAnimationFrame( EntGL.Controller.update );
        var instance = EntGL.Controller;
        instance.ui.update();
        if(instance.model.hasChange()){
            instance.graphics.updateModel(
                instance.model.currentEventId);
        }
        instance.graphics.update();    
    },
    start: function(){
        var containerMng = new EntGL.ContainerMng({
            info:"descriptionBox",
            main:"container"}),
            panels = this.configuration.panels;
        $(document).ready(function(){
            containerMng.enablePanels(panels);
        });

        this.model = new EntModel();
        this.graphics = new EntGraphics();
        containerMng.add(this.graphics.renderer.domElement);    
        this.ui = new EntInteraction(this.graphics); 
        this.ui.containerManager = containerMng;        
        this.configuration.defaultModel();
        // start updates
        EntGL.Controller.update();
    }
}