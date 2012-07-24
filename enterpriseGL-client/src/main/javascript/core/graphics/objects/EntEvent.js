function EntEvent(){
    this._element = null;
    this._duration = 0;
    this._timeStart = new Date();
}

EntEvent.prototype = {
    isDied: function(){
        var r = (new Date()) - this._timeStart; 
        return r > this._duration;
    },
    
    applyOn: function(scene){
        
    }
}