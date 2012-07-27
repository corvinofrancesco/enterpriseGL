function EntSetting(condition, action, event){
    this.id = "new";
    this.eventType = GraphicalSettings.EventType.ADD;
    this.elementType = EntGL.ElementType.Particle;       
    this.defaultAction = action || function(event,scene,element,system){};
    this._condition = condition || function(element){return true;};
    this.duration = 0;
    this._isAdvancedEvent = false;
    this._advConstructor = EntGraphicalEvent;
    this._advProps = [];
}

EntSetting.prototype = {
    verifyCondition: function(element){
        return this._condition(element);
    },
    
    configureForAdvEvent: function(constructor, props){
        this._advConstructor = constructor;
        this._advProps = props;
        this._isAdvancedEvent = true;
    },
    
    create: function(element){
        var e = null;
        if(this._isAdvancedEvent){
            e = new this._advConstructor(
                element,
                this.defaultAction, 
                this._advProps);
        } else {
            e = new EntGraphicalEvent(
                element,
                this.defaultAction,
                this.duration);            
        }
        e.settingGen = this.id;
        return e;
    }
}