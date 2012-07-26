function EntGraphicalEvent(element, action, duration){
    this._element = element;
    this._duration = duration;
    this._timeStart = null;
    this._runningFunction = action;
}

EntGraphicalEvent.prototype = {
    isDied: function(){
        if(this._timeStart == null) return false; 
        var r = (new Date()) - this._timeStart; 
        return r > this._duration;
    },
    
    applyOn: function(scene,system){
        if(this._timeStart == null) this.startTimer();
        this._runningFunction(this,scene,this._element,system);
    },
    
    startTimer: function(){
        this._timeStart = new Date();
    },
    
    getElement: function(){
        return this._element;
    }
}

var EntGraphicalEventControlledEnd = function(element, action, endCondition){
    this._element = element;
    this._duration = 0;
    this._timeStart = null;
    this._runningFunction = action;
    // extended properties
    this._endCondition = endCondition || function(){return false;}; // default never end
    this._numIteration = 0;
}

EntGraphicalEventControlledEnd.prototype = new EntGraphicalEvent(null,null,0);
EntGraphicalEventControlledEnd.constructor = EntGraphicalEventControlledEnd;
EntGraphicalEventControlledEnd.superclass = EntGraphicalEvent.prototype;

/**
 * Override parent method to verify the condition first, if endCondition is true then 
 * start the timer.
 */
EntGraphicalEventControlledEnd.prototype.applyOn = function(scene,system){
    if(this._endCondition(this,scene,system)) this.startTimer();
    this._runningFunction(this,scene,this._element,system);    
    this._numIteration++;
}