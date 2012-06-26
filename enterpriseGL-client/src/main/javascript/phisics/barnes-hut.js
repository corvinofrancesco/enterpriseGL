/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function BarnesHut(){
    
}

BarnesHut.prototype = {
    insert : function (element){
        
    },
    
    getForceFor : function (element){
        
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