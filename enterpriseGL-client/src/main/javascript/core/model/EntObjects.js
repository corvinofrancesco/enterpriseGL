/**
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
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

EntObjects.register = function(object){
    EntObjects.istance.objects[object.id] = object;
}

EntObject.unregister = function(object){
    EntObjects.instance.objects[object.id] = undefined;
}

EntObject.getInfo = function(id){
    return EntObjects.instance.objects[id].getDescription();
}

EntObject.getLink = function(id){
    
}