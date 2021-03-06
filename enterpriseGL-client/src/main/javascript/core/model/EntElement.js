function EntElement(){
    this.type = EntGL.ElementType.PARTICLE;
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
        this.id = id;        
    },
    
    register: function(){
        EntGL.Objects.register(this);        
    },
    
    unregister: function(){
        EntGL.Objects.unregister(this);        
    }
}