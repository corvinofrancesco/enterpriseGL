function EntSetting(){
    this.eventType = GraphicalSettings.EventType.ADD;
    this.elementType = GraphicalSettings.ElementType.Particle;        
}

EntSetting.prototype = {
    verifyCondition: function(element){
        
    },
    
    create: function(element){
        var e = new EntEvent();
        return e;
    }
}