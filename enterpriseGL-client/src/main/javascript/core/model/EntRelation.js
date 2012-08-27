function EntRelation(idSource, idDestination){
    this.type = EntGL.ElementType.RELATION;    
    this.idSource = idSource;
    this.idDestination = idDestination;
}


EntRelation.prototype = new EntElement();
EntRelation.prototype.constructor = EntRelation;

EntRelation.prototype.getSource = function(){
    return EntGL.Objects.get(this.idSource);
}

EntRelation.prototype.getDestination = function(){
    return EntGL.Object.get(this.idDestination);
}