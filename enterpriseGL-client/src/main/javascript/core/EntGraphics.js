/**
 * Class used to load graphics elements of enterprise rapresentation
 */
function EntGraphics() {
    this.modelLoader = new SimulSystem();
    this.psystem = new ParticleSystem();  
    this.modelLoader.popolate(this.psystem);
    this.primitives = {
        starParticles : new ParticleCube()
        
    };
}

EntGraphics.prototype = {
    load : function(gl,reqManager){
        for(var i in this.primitives){
            // load programs
            var shVsrc = sglNodeText(this.primitives[i].idVShaderSrc);
            var shFsrc = sglNodeText(this.primitives[i].idFShaderSrc);
            var program = new SglProgram(gl,[shVsrc],[shFsrc]);
            this.primitives[i].program = program;
            /// carica i modelli delle primitive
            this.primitives[i].load(gl,reqManager);            
        }
        
    }
    
}
