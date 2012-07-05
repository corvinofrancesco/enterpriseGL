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
    EntObjects.instance.objects[object.id] = object;
}

EntObjects.unregister = function(object){
    EntObjects.instance.objects[object.id] = undefined;
}

EntObjects.get = function(id) {
    if(EntObjects.instance.objects[id]) 
        return EntObjects.instance.objects[id];
    else return null;
}

EntObjects.getInfo = function(id){
    return EntObjects.get(id).getDescription();
}

EntObjects.getLink = function(id){
    return EntObjects.instance.generateLink(id);
}
