function EntSetting(condition, action){
    this.eventType = GraphicalSettings.EventType.ADD;
    this.elementType = GraphicalSettings.ElementType.Particle;       
    this.defaultAction = action || function(event,scene,element){};
    this._condition = condition || function(element){return true;};
}

EntSetting.prototype = {
    verifyCondition: function(element){
        return this._condition(element);
    },
    
    create: function(element){
        var e = new EntEvent(element,this.defaultAction,0);
        return e;
    }
}

EntSetting.createFunctions = {
    
}