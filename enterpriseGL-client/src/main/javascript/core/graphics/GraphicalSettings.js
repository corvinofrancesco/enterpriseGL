function GraphicalSettings(){
    this.settings = {};
    this.events = [];
    //TODO set default
}

GraphicalSettings.EventType = {
    ADD: "add", REMOVE: "remove", UPDATE: "update"
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
//        if(eventId < this.events.length)
//            this.events.splice(eventId,1);
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
    }
        
}