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
    },
    
    changeSettings: function(props){
        for(var p in props){
            if(this["change" + p] instanceof Function){
                try{
                    this["change" + p](props[p]);
                } catch(e){}
            }
        }
    },
    
    changeColors: function(colors){
        if(colors instanceof Array){
            this.element.material.color.setRGB(
                colors[0],colors[1],colors[2]);             
        } else this.element.material.color.setHex(Math.random() * 0xffffff); 
        this.colorMaterial = this.element.material.color.getHex();
    },
    
    changeMaterial: function(material){
        switch(material){
            case "phong":
                this.element.material = new THREE.MeshPhongMaterial( {color: this.colorMaterial} );
                break;
            case "lambert":
                default:
                this.element.material = new THREE.MeshLambertMaterial( {color: this.colorMaterial} );
        }
    },
    
    changeTypePrimitive: function(primitive){
        if(primitive == "random") {
            var types = [],objects = {},sel;
            try {
                objects = this.element.generator.Primitive; 
                for(var p in objects) types.push(p);
            } catch(e){}
            if(types.length!=0){
                sel = Math.floor( Math.random() * types.length );
                primitive = objects[types[sel]];
            } 
        }
        if(primitive != this.typePrimitive){
            this.isChangedPrimitive = true;
            this.typePrimitive = primitive;
        }
    }
}