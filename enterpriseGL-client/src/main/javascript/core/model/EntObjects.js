/**
 * Register and unregister enterprise objects retrive from server.
 */
function EntObjects(){
    this.objects = {};
    this.undefLink = "Undefined Object";
    this.callbackName = "EntInteraction.clickOnObject";
    EntObjects.instance = this;    
}

EntObjects.prototype = {
    generateLink : function(id){
        if(!this.objects[id]) return this.undefLink;
        var ob = this.objects[id], 
            shortDesc = "", title = "object " + id, text = "";
        if(ob.title) title = ob.title;    
        if(ob.shortDescription) shortDesc = ob.shortDescription();
        
        text += "<a onclick='"+this.callbackName+"("+id+");'>";
        text += title +"</a>:" + shortDesc;
        return text;
    }
}

/**
 * Register function of objects
 * @param object object to be register
 */
EntObjects.register = function(object){
    EntObjects.istance.objects[object.id] = object;
}

EntObject.unregister = function(object){
    EntObjects.instance.objects[object.id] = undefined;
}

EntObject.get = function(id) {
    if(EntObjects.instance.objects[id]) 
        return EntObjects.instance.objects[id];
    else return null;
}

EntObject.getInfo = function(id){
    return EntObjects.get(id).getDescription();
}

EntObject.getLink = function(id){
    return EntObject.instance.generateLink(id);
}