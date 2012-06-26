/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function BarnesHut(){
    this.root = new Region(0,0,0);
    this.root.range = 100;
    // TODO: controllare l'algoritmo di inserimento delle particelle
}

BarnesHut.prototype = {

    /**
     * Inserisce un elemento nella regione principale.
     */
    insert : function (element){
        this.root.insert(element);
    },
    
    /**
     * 
     */
    getForceFor : function (element){
        // richiama la proprietà della particella
        element.computeForce(this.root,this.root.range * 2);
    },
    
    /**
     * Se richiamata si occupa di configurare i valori dell'algoritmo.
     */
    configureFor : function (force) {
        
    }
}

var BarnesHutConfig = {
        dtime : 0.025,
        dthf : function(){return 0.5 * BarnesHutConfig.dtime;},
        tol: 0.5,
        itolsq : function(){ return 1 / (BarnesHutConfig.tol * BarnesHutConfig.tol);},
        eps: 0.05,
        epssq: function(){ return BarnesHutConfig.eps * BarnesHutConfig.eps; } 
}