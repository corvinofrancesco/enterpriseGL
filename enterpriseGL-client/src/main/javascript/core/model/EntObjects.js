/**
 * Register and unregister enterprise objects retrive from server.
 */
EntGL.Objects = {
    objects: {},
    undefLink: "Undefined Object",
    callbackName: "EntGL.Interaction.clickOnObject",

    generateLink : function(id){
        if(!this.objects[id]) return this.undefLink;
        var ob = this.objects[id], 
            shortDesc = "", title = "object " + id, text = "";
        if(ob.title) title = ob.title;    
        if(ob.shortDescription) shortDesc = ob.shortDescription();
        
        text += "<a onclick='"+this.callbackName+"(\""+id+"\");'>";
        text += title +"</a>:" + shortDesc;
        return text;
    },
    
    /**
     * This function returns all particles registered
     * @see EntGraphics class that invokes this method
     */
    getParticles: function(){
        var retArray = [];
        for(var i in this.objects){
            var e = this.objects[i];
            if(e instanceof EntElement) retArray.push(e);
        }
        return retArray;
    },
    
    /**
     * This function returns all events registered
     * @see EntGL.Model class that invokes this method for timeline
     */
    getEvents: function(){
        var retArray = [];
        for(var i in this.objects){
            var e = this.objects[i];
            if(e instanceof EntEvent) retArray.push(e);
        }
        return retArray;        
    },

/**
 * Register function of objects
 * @param object object to be register
 */
    register: function(object){
        this.objects[object.id] = object;
    },

    unregister: function(object){
        this.objects[object.id] = undefined;
    },

    get: function(id) {
        if(EntGL.Objects.objects[id]) 
            return EntGL.Objects.objects[id];
        else return null;
    },

    getInfo: function(id){
        return EntGL.Objects.get(id).getDescription();
    },

    getLink: function(id){
        return EntGL.Objects.generateLink(id);
    }
}