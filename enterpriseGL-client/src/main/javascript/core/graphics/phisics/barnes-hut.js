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
     * Calculate the sum of forces for a particle
     * @param particle element witch it calculate force
     * @return acceleration to assign at element
     */
    getForceFor : function(particle){
        var queque = [{elem: this.root,dsq: this.root.range*2}],
            a = new THREE.Vector3(0,0,0);
        while(queque.length>0){
            var curr = queque.shift();
            var node = curr.elem,
                dsq = curr.dsq,
                dr = particle.position.clone()
                    .subSelf(curr.position);
            var drsq = dr.lengthSq();
            if(drsq < dsq){
                if(node instanceof Region){
                    for(var i in node.childs){
                        queque.push({
                            elem: node.childs[i],
                            dsq: dsq*0.25
                        });
                    }
                } else if(node != this)
                    // se il nodo è una particella si calcolano le forze
                    a.addSelf(this.getForce(node,dr,drsq));
            } else 
                // distanza sufficiente per considerare 
                // le particelle come un unico corpo
                a.addSelf(this.getForce(node,dr,drsq));
        }        
        return a;
    },

    /**
     * Function used by getForceFor method to calculate a single force
     * on a particle.
     * Change this method to configure force applied
     * @param node this param specified the element source of force
     * principaly it is used for mass property
     * @param dist is a @see THREE.Vector3 element witch address the distance
     * between the source node and destination node to apply force, 
     * need to calculate the versor of force
     * @param drsq 'direction square' the square of distance, this param indicates
     * the distance so it is used to calculate the intensity and versus of force
     * @return acceleration 
     */
    getForce: function(node,dist,drsq){
        var idr = 1 / Math.sqrt(drsq + BarnesHutConfig.epssq()),
            a = dist.clone(),
            m = node.getMass();
        /// calcola l'accelerazione come
        // circa = m / (distance) ^ 3
        a.multiplyScalar(m*idr*idr*idr);
        return a;
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