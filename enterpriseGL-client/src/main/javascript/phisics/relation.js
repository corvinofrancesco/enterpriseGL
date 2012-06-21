function Relation(idSource, idDest) {
    this.idS = idSource;
    this.idD = idDest;
}

Relation.prototype = {
    getArray: function(){
        return new Array(this.idS, this.idD);
    }, 
    
    isIndexIn: function(index) {
        return ((this.idS == index) || (this.idD == index));
    }
}
