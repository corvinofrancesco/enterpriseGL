function ParticleBase(){
    this.entParticle = null;
    this.element = null;        
}

ParticleBase.prototype = {
    create: function(){
        if((this.element!=null) && (this.entParticle!=null)){
            this.linkToModel(this.entParticle);
        }
        return this.element;
    },
    
    linkToModel: function(entParticle){
        this.entParticle = entParticle;
        if(this.element==null) return;
        this.element.relations = entParticle.relations || [];
        this.element.modelReference = entParticle.id;
        this.element.accelerations = new THREE.Vector3(0,0,0);
        this.element.velocity = new THREE.Vector3(0,0,0);
    },
    
    getElement: function(){
        return this.element;
    }
}