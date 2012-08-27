/**
 * Define a enterprise particle: an object with enterprise semantic.
 */
function EntParticle(){
    EntElement.call(this);
    this.title = "empty";
    this.body = "empty";
    this.relations = [];
    this.changes = {};
}

EntParticle.prototype = new EntElement();
EntParticle.prototype.constructor = EntParticle;

EntParticle.prototype.getDescription = function(){
    var text = "";
    text += "<h1>" + this.title +"</h1>";
    text += "<p>" + this.definition + "</p>";
    text += "<p>" + this.description + "</p>";
    if(this.relations.length>0){
        text += "<ul>";
        for(var i in this.relations){
            var e = EntGL.Objects.generateLink(this.relations[i]);
            text += "<li>" + e + "</li>";
        }        
        text += "</ul>";
    }
    return text;
}

EntParticle.prototype.setProperties = function(prop){
    this.setId(prop.id);
    this.title = prop.title || this.title;
    this.relations = this.relations.concat(prop.relations);
    this.description = prop.description || "there isn't description for this element!";
    this.definition = prop.definition || "not defined!";
}

EntParticle.prototype.getChange = function(id){
    if(!this.changes[id]) return this;
    var p = new EntParticle();
    p.id = this.id;
    p.relations = this.changes[id].relations;
    p.properties = this.changes[id].properties;
    return p;
}