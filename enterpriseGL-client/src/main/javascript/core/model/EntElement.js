function EntElement(){
    this.type = "particle";
    this.description = "This is an empty object of enterprise";
    this.id = 0;
}

EntElement.prototype = {
    getDescription: function(){
        return this.getDescription();
    },
    
    getId: function() {
        return this.id;
    },
    
    setId: function(id){
        if(this.id) EntObjects.unregister(this);
        EntObjects.register(this);
        this.id = id;        
    }
}