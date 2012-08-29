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
    commands: {
        
    },
    register: function(command){
        this.commands[command.id] = command;  
    },
    
    invoke: function(command){
        if(this.commands[command])
            this.commands[command].execute
                .call(this.commands[command].receiver);
    },
    
    completeDownload :function(){
        // set the timeline to the first event
        EntGL.Model.init();                
        var graphic = EntGL.Controller.graphics,
            event = EntGL.Model.currentEventId;
        graphic.updateModel(event);
        EntGL.Interaction.mouse 
            = graphic.createMouseSelector();
    },
    downloadModel: function(){
        var url = this.configuration.infoModelLoad(this.downloadIndex);
        $.getJSON(url, function(data){
            // parse and elaborate data
            EntGL.model.addObjects(data.items);
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
        EntGL.Model.reset();
        EntGL.Graphics.reset();
        // prepare configuration
        if(conf.infoModelUrl){
            $.getJSON(conf.infoModelUrl(idModel), function(data){
                //TODO Configure the graphics builder with data received
                EntGL.Graphics.system.changeDistribution(
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
        EntGL.Interaction.update();
        if(EntGL.Model.hasChange()){
            EntGL.Graphics.updateModel(
                EntGL.Model.currentEventId);
        }
        EntGL.Graphics.update();    
        requestAnimationFrame( EntGL.Controller.update );
    },
    start: function(){
        EntGL.ContainerMng.init({
            info:"descriptionBox",
            main:"container"});

        this.configuration.defaultModel();
        EntGL.Model.init();
        EntGL.Graphics.init();
        EntGL.ContainerMng.add(EntGL.Graphics.renderer.domElement);    
        EntGL.Interaction.init(EntGL.Graphics); 
        EntGL.Interaction.containerManager = EntGL.ContainerMng;        
        // call only after all documents are loaded
        $(document).ready(function(){
            EntGL.ContainerMng.enablePanels(
                EntGL.Controller.configuration.panels);
            // start updates
            EntGL.Controller.update();
        });
    }
}