/**
 * Class used to load graphics elements of enterprise rapresentation
 */
function EntGraphics() {
    this.modelLoader = new SimulSystem();
    this.psystem = new ParticleSystem();  
    this.modelLoader.popolate(this.psystem);
    this.primitives = {
        starParticles : new ParticleStar(),
        cubeParticles : new ParticleCube(),
        baseRelation : new RelationSimple()
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
    },
    
    draw : function(gl,context){
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.enable(gl.BLEND);
        for(var i in this.psystem.particles){
          var p = this.psystem.particles[i];
          context.xform.model.push();
          context.xform.model.loadIdentity();
          
          //this.xform.model.translate(p.x,p.y,p.z);
          //this.xform.model.scale(0.1,0.1,0.1);
          this.primitives.starParticles.draw(gl,context,p);
          context.xform.model.pop();
        }  
        
        gl.disable(gl.BLEND);

        for(var i in this.psystem.relations) {
          var r = this.psystem.relations[i];
          var particles = this.psystem.particles;
          r.source = particles[r.idS];
          r.destination = particles[r.idD];
          context.xform.model.push();
          context.xform.model.loadIdentity();
          this.primitives.baseRelation.draw(gl,context,r);
          context.xform.model.pop();
        }
        
    }
    
}
