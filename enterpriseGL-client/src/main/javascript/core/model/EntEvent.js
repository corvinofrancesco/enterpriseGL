/**
 * 
 */
function EntEvent(){
    EntElement.call(this);
    this.type = EntGL.ElementType.EVENT;
    this.graphicalModel = null;
    this.title = "event";
    this.date = new Date();
    this.objects = [];
}

EntEvent.prototype = new EntElement();
EntEvent.prototype.constructor = EntEvent;

EntEvent.prototype.getDescription = function(){
    var text = "";
    text += "<h1>" + this.date + ": " + this.title +"</h1>";
    text += "<p>" + this.description + "</p>";
    if(this.relations.length>0){
        text += "<ul>";
        for(var i in this.objects){
            var e = EntGL.Objects.generateLink(this.objects[i]);
            text += "<li>" + e + "</li>";
        }        
        text += "</ul>";
    }
    return text;
}

EntEvent.prototype.posInObjects = function(idObj){
    if(idObj instanceof EntParticle){
        idObj = idObj.id;
    }
    return $.inArray(idObj, this.objects);
}

EntEvent.prototype.setProperties = function(prop){
    this.setId(prop.id);
    this.title = prop.nametime || this.title;
    this.date = prop.date || this.date;
    this.description = prop.description;
    this.objects = prop.objects;
}
