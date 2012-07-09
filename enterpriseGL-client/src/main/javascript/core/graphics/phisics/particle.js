function Particle(id){
    /** origin position for new particles */
    this.x = 0;
    this.y = 0;
    this.z = 0;
    
    /** starting velocity of particle */
    this.velocity = {x:0,y:0,z:0};
    
    this.directions = {x:0,y:0,z:0};
    
    this.accelerations = {x:0, y:0, z:0};
    
    /** color of particles */
    this.color = {r:0,g:1,b:0.5};
    
    /** initial energy */
    this.energy = 1;
    
    /** mass of particles */
    this.mass = 1;
    
    /** description and identification of particle */
    this.id = id;
    this.propertyCallBack = null;
}

Particle.prototype = {
    
    move : function(x,y,z) {
        this.x += x;
        this.y += y;
        this.z += z;
        return this;
    },
    
    quadDistance : function(n){
        var node = n || {x:0, y:0, z:0};
        var r = {
            x: (this.x - node.x),
            y: (this.y - node.y),
            z: (this.z - node.z)
        };
        return r.x * r.x + r.y * r.y + r.z * r.z;       
    },
    
    distance : function(n){
        return Math.sqrt(this.quadDistance(n));
    },
    
    /**
     * This function use the callback <code>propertyCallBack</code> to retrive
     * specific information of this object.
     * 
     * @return property called name for this object
     */
    getProperty: function(name){    
        // TODO getProperty
    },
    
    dirArray : function(){
        return new Array(
        this.directions.x,this.directions.y,this.directions.z);
    },
    
    velArray : function(){
        return new Array(
        this.velocity.x,this.velocity.y,this.velocity.z);
    },
    
    accArray : function(){
        return new Array(
        this.accelerations.x,this.accelerations.y,this.accelerations.z);
    },
    
    colArray : function(){
        return new Array(
        this.color.r,this.color.g,this.color.b);
    },
    
    advance: function() {
        var dvelx, dvely, dvelz;
	var velhx, velhy, velhz;
        
        dvelx = this.accelerations.x * BarnesHutConfig.dthf();
        dvely = this.accelerations.y * BarnesHutConfig.dthf();
        dvelz = this.accelerations.z * BarnesHutConfig.dthf();
        
        velhx = this.velocity.x + dvelx;
        velhy = this.velocity.y + dvely;
        velhz = this.velocity.z + dvelz;
        
        this.x += velhx * BarnesHutConfig.dtime;
        this.y += velhy * BarnesHutConfig.dtime;
        this.z += velhz * BarnesHutConfig.dtime;
        
        this.velocity.x = velhx + dvelx;
        this.velocity.y = velhy + dvely;
        this.velocity.z = velhz + dvelz;
    }, 
    
    // size è il diametro della regione root
    computeForce: function(root, size) {
        var ax, ay, az;
        ax = this.accelerations.x;
        ay = this.accelerations.y;
        az = this.accelerations.z;
        this.accelerations.x = 0;
        this.accelerations.y = 0;
        this.accelerations.z = 0;
        
        this.recurseForce(root, size*size*BarnesHutConfig.itolsq());
        
        this.velocity.x += (this.accelerations.x - ax) * BarnesHutConfig.dthf();
        this.velocity.y += (this.accelerations.y - ay) * BarnesHutConfig.dthf();
        this.velocity.z += (this.accelerations.z - az) * BarnesHutConfig.dthf();
    },
    
    recurseForce: function(node, dsq) {
        var point;
        var drsq, nphi, scale, idr,
            dr = node.point.clone().subSelf(point),
            a = new THREE.Vector3(0,0,0);
        
        drsq = dr.lengthSq();
        var thisParticle = this;
        
        // la distanza non è sufficiente per considerare le particelle come un unico corpo
        if (drsq < dsq) {
            // se il nodo è una regione si calcolano le forze dei childs
            if(node instanceof Region) {
                dsq *= 0.25;
                node.childs.forEach(function(ch){
                    if(ch != undefined) {
                        thisParticle.recurseForce(ch, dsq);
                    }
                });
            } else if(node != this) { // se il nodo è una particella si calcolano le forze
                    drsq += BarnesHutConfig.epssq();
                    idr = 1 / Math.sqrt(drsq);
                    ///TODO calcola l'accelerazione
                    scale = node.mass*idr*idr*idr;
                    dr.multiplyScalar(scale);
                    a.addSelf(dr)
            }
        } else { // la distanza è sufficiente per considerare le particelle come un unico corpo
                drsq += BarnesHutConfig.epssq();
                idr = 1 / Math.sqrt(drsq);
                ///TODO calcola l'accelerazione
                scale = node.mass*idr*idr*idr;
                dr.multiplyScalar(scale);
                a.addSelf(dr)
        }
    }
           
}
