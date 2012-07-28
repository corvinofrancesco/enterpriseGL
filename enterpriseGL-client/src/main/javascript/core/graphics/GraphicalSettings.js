function GraphicalSettings(){
    this.settings = {};
    this.events = [];
    this.configuration = {};
    //TODO set default
}

GraphicalSettings.EventType = {
    ADD: "add", REMOVE: "remove", UPDATE: "update"
}

GraphicalSettings.DefaultConfig = {
    particles: {
        
    }
}

GraphicalSettings.prototype = {
    register: function(eventType, element){
        var q = this.getSettings(), setting;
        while(q.length>0){
            setting = q.shift();
            if(eventType == setting.eventType)
                if(element.type == setting.elementType)
                    if(setting.verifyCondition(element)){
                        var event = setting.create(element);
                        this.events.push(event);
                        return event;
                    }
        }
        return null;
    },
    
    remove: function(eventId){
        if(eventId < this.events.length)
            this.events.splice(eventId,1);
    },
    
    clearDiedEvents: function(){
       var resArr = [];
       for(var i in this.events) 
           if(!this.events[i].isDied()) resArr.push(this.events[i]);
       this.events = resArr;
    },
    
    getEvents: function(){
        var ret = (new Array()).concat(this.events);
        return ret;
    },
    
    changeSetting: function(setting){
        if(setting instanceof EntSetting)
            this.settings[setting.id] = setting;
    },
    
    removeSetting: function(setting){
        this.settings[setting.id] = undefined;
    },
    
    getSettings: function(){
        var arr = [];
        for(var i in this.settings){
            if(this.settings[i] instanceof EntSetting)
                arr.push(this.settings[i]);
        }
        return arr;
    },
    
    addSettings: function(settings){
        for(var i in settings){
            this.changeSetting(settings[i]);
        }        
    },
    
    updateSetting: function(config){
        this.configuration = config || {};
        config = this.configuration;
        var action = function(event,scene,element,system){
            for(var p in system.particles){
                var primitive = new ParticleBase(),
                    conf = config.particles || {};
                if(system.particles[p].generator) primitive = new system.particles[p].generator();
                primitive.element = system.particles[p];
                primitive.changeSettings(conf);
                // creation of element
                if(primitive.isChangedPrimitive){
                    var oldElem = primitive.getElement(), newElem;
                    scene.remove(oldElem);
                    system.remove(oldElem);
                    primitive.linkToModel(EntObjects.get(oldElem.modelReference))
                    newElem = primitive.create();
                    newElem.position = oldElem.position;
                    scene.add(newElem);
                    system.add(newElem);
                }
            }            
        };
        var sett =  new EntSetting(null,action);        
        var event = sett.create(null);
        this.events.push(event);
    }
            
}