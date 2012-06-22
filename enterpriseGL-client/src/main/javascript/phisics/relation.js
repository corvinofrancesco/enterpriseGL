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
    },
    
    areIndexIn: function(ind1, ind2) {
        return (((this.idS == ind1)||(this.idD == ind1))&&
            ((this.idS == ind2)||(this.idD == ind2)));
    }
}
