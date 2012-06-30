function  EntModel(){
    this.system = new ParticleSystem();
    this.loader = new FixedParticles();
    this.loader.popolate(this.system);
}

EntModel.prototype = {
    
    init : function(){
        
    }
}