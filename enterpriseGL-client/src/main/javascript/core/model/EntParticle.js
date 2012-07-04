/**
 * Define a enterprise particle: an object with enterprise semantic.
 */
function EntParticle(){
    EntObject.call(this);
    this.graphicalModel = new ParticleCube();
    this.title = "empty";
    this.body = "empty";
    this.relations = [];
}

EntParticle.prototype = new EntObject();
EntParticle.prototype.constructor = EntParticle;

EntParticle.prototype.getDescription = function(){
    var text = "";
    text += "<h1>" + this.title +"</h1>";
    text += "<p>" + this.body + "</p>";
    if(this.relations.length>0){
        text += "<ul>";
        for(var i in this.relations){
            var e = EntObjects.instance.generateLink(this.relations[i]);
            text += "<li>" + e + "</li>";
        }        
        text += "</ul>";
    }
    return text;
}

EntParticle.prototype.setProperties = function(prop){
    this.setId(prop.id);
    this.title = prop.title || this.title;
    this.body = prop.body || this.body;
}