function GraphicalSettings(){
    this.settings = [];
    this.events = [];
    //TODO set default
}

GraphicalSettings.prototype = {
    register: function(eventType, element){
        var q = new Array(this.settings), setting;
        while(q.length>0){
            setting = q.shift();
            if(eventType == setting.eventType)
                if(element.type == setting.elementType)
                    if(setting.verifyCondition(element)){
                        this.events.push(setting.create(element));
                    }
        }
    },
    
    remove: function(eventId){
        if(eventId < this.events.length)
            this.events.splice(eventId,1);
    }

    
    
}