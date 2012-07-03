/**
 * Class used to load graphics elements of enterprise rapresentation
 */
function EntGraphics() {
    this.modelLoader = new FixedParticles();//SimulSystem();
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
        for(var i in this.psystem.particles){
          var p = this.psystem.particles[i];
          context.xform.model.push();
          context.xform.model.loadIdentity();
          
          //this.xform.model.translate(p.x,p.y,p.z);
          //this.xform.model.scale(0.1,0.1,0.1);
          this.primitives.cubeParticles.draw(gl,context,p);
          context.xform.model.pop();
        }  

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
        
            var sys = new ParticleSystem();
            sys.add((new Particle(0)),null);
            sys.add((new Particle(1)).move(1,0,0),null);
            sys.add((new Particle(2)).move(0,1,0),null);
            sys.add((new Particle(3)).move(0,0,1),null);
            sys.add((new Particle(4)).move(0,0,2),null);
            sys.add((new Particle(5)).move(1,1,0),null);
            sys.relations = [
                new Relation(0,1),
                new Relation(0,2),
                new Relation(0,3),
                new Relation(3,4),
                new Relation(2,5)
            ];   
        for(var i in sys.relations) {
          var r = sys.relations[i];
          var particles = sys.particles;
          r.source = particles[r.idS];
          r.destination = particles[r.idD];
          context.xform.model.push();
          context.xform.model.loadIdentity();
          this.primitives.baseRelation.draw(gl,context,r);
          context.xform.model.pop();
        }
          
    }
    
}
