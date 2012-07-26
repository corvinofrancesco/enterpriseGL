function EntRelation(){
    this.type = EntGL.ElementType.RELATION;    
}


EntRelation.prototype = new EntElement();
EntRelation.prototype.constructor = EntRelation;
