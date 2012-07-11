/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function BarnesHut(){
    this.root = new Region(0,0,0);
    this.root.range = 100;
}

BarnesHut.prototype = {

    /**
     * Inserisce un elemento nella regione principale.
     */
    insert : function (element){
        if(!element.position) return false;
        // element out of bound
        if(!this.root.contains(element)) {
            this.root.resize(element.position.length() + 50);
            // TODO update all the regions
        }
        // aggiunge ad element gli attributi di controllo        
        element.barneshut = {
            region: this.root,
            insertPos: element.position.clone()
        }
        if(!element.getMass){
            // set default mass function
            element.getMass = function(){
                return 1;
            }
        }
        this.root.insert(element);
        return true;
    },
    
    /**
     * Rimuove l'elemento passato dai rami delle regioni
     * Se la regione non contiene altri elementi, viene eliminata.
     * Non effettua aggiornamenti sulla posizione.
     * @param element particella da eliminare (non una regione)
     */
    remove : function (element){
        if(!element.barneshut) return false;
        var childs = element.barneshut.region.childs;
        for(var i in childs){
            if(childs[i]==element) {
                childs.splice(i,1);
                if(childs.length==0){
                    // rimuovere la regione dal parent
                    var r = element.barneshut.region;
                    if(r.parent){
                        r.parent.childs[r.index] = undefined;
                    }
                }
                return true;
            }
        }
        return false;
    },
    
    /**
     * Effettua l'aggiornamento delle regioni e dei loro punti
     */
    update : function(){
        var q = [this.root], exitQueque = [];
        while(q.length>0){
            var node = q.shift();
            if(node instanceof Region){
                node.computeCenterOfMass();
                q.push(node.childs);
            } else if(node != undefined) if(node.barneshut != undefined){
                var r = node.barneshut.region;
                if(!r.contains(node)) {
                    exitQueque.push(node);
                    if(r.parent){
                        r.parent.reinsert(node,r)
                    }
                }
            }
        }
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
                dr = particle.position.clone().subSelf(node.position);
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
        return a.multiplyScalar(particle.getMass());
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
        if(a.lengthSq()<0.01){
            a.set(Math.random(),Math.random(),Math.random()).normalize();
        }
        /// calcola l'accelerazione come
        // circa = m / (distance) ^ 3
//        a.multiplyScalar(m*idr*idr*idr);
        a.multiplyScalar(m*idr*idr*idr/100);
        return a;
    },
    
    getFreeRegion: function(region){
        var q = [region || this.root],
            pointRegions = [],
            peso = 0, head;
        while(q.length>0){
            var rcurr = q.shift();
            if(!rcurr.childs) return rcurr.centre;
            if(rcurr.childs.length==0) return rcurr.centre;
            for(var rInd=0; rInd<8; rInd++){
                var elem = rcurr.childs[rInd];
                if(!elem) return rcurr.getCentreForSubRegion(rInd);
                else if(elem instanceof Region){                    
                    peso+= 0.125;
                    q.push(elem);
                    if(pointRegions.length>0){ // ci sono punti in coda
                        head = pointRegions[0];
                        if(head.peso - peso >= 1){ 
                            // conviene creare un punto affianco al punto in coda 
                            return head.region.getPosNextTo(head.index, head.particle);
                        }
                    }
                } else {
                    // aggiunge regione del punto
                    pointRegions.push({
                        region: rcurr, 
                        index: rInd, 
                        level: Math.round(peso), 
                        particle: elem});
                }
            }            
        }
        head = pointRegions[0];
        return head.region.getPosNextTo(head.index, head.particle);
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
        itolsq : function(){return 1 / (BarnesHutConfig.tol * BarnesHutConfig.tol);},
        eps: 0.5,
        epssq: function(){return BarnesHutConfig.eps * BarnesHutConfig.eps;} 
}