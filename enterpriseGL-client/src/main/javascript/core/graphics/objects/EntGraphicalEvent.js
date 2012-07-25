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