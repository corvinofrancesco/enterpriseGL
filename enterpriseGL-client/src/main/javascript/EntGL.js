var EntGL = EntGL || {};

EntGL.ElementType = {
    PARTICLE: "particle", EVENT: "event", RELATION: "relation", AGGREGATION: "aggregation"
};

EntGL.DistributionAlgs = {
    Default: "DistributionAlg", Graph: "DistributionGraph"
};

EntGL.Simulations = {
    ConeTree: "SimulationConeTree", LittleSystem: "SimulationLittleSystems", Random: "SimulationRandomGraph", TwoParticle: "SimulationTwoParticles"
};

EntGL.SettingsDefault = function(){
    
};
    
EntGL.SettingsDefault.prototype = {
    createParticleFunctions: {
        particleGeom: function(){
            var action = function(event,scene,element,system){
                if(element instanceof EntElement){
                    // creation of element
                    var primitive = new ParticleGeomPrimitive();
                    primitive.linkToModel(element);
                    var cond = Math.random();
                    if(cond<0.5){ // sphere
                        primitive.typePrimitive = ParticleGeomPrimitive.Primitive.SPHERE;                  
                    } else { // cube
                        primitive.dimension = 1;                            
                    }
                    if(primitive.create()==null) return;
                    event._element = primitive;
                    event.settingGen = "createParticleGeom";
                    scene.add(primitive.getElement());
                    primitive.getElement().position = null;
                    system.add(primitive.getElement())
                    return;
                }
            };
            // all particles
            var condition = function(element){return true;};
            var sett =  new EntSetting(condition,action);        
            sett.id = "createParticleGeom";
            return sett;
        },
        particleAthom: function(){
            var sett = new EntSetting(
                function(element){return false;},
                function(event,scene,element,system){}); 
            sett.id = "createParticleAthom";
            return sett;
        } 
    },

    createFunctions: {
        relationAdding: function(){
            var retSet = new EntSetting(null,function(event,scene,element,system){
                if(element instanceof RelationBase) {
                    var elems = element.getElemInSystem(system);
                    element.update(elems[0], elems[1]);
                } else if(element instanceof EntRelation){
                    // creation of element
                    var primitive = new RelationBase();
                    primitive.linkToModel(element);
                    if(primitive.create()==null) {
                        return;
                    } 
                    event._element = primitive;
                }
            });
            var liveCond = function(event,scene,system){
                var e = event.getElement();
                if(e instanceof RelationBase) {
                    var ret = e.getElemInSystem(system);
                    if((ret[0]==null)||(ret[1]==null)) {
                        if(e.hasPaintedElement) scene.remove(e.getElement());
                        return true;
                    }
                    scene.add(e.getElement());
                    e.hasPaintedElement = true;
                } 
                return false;
            };
            retSet.configureForAdvEvent(EntGraphicalEventControlledEnd,liveCond);
            retSet.elementType =  EntGL.ElementType.RELATION;
            retSet.id = "createSimpleRelation";
            return retSet;     
        }        
    },
    
    removeFunctions: {
        removeSimple: function(){ 
            var sett =  new EntSetting(null,function(event,scene,element,system){
                scene.remove(element.element);            
            });
            sett.id = "remove";
            return sett;
        }
    },    
    
    popolate: function(){
        var arr = [], curr, index;
        for(index in this.createParticleFunctions ){
            curr = this.createParticleFunctions[index]();
            curr.eventType = GraphicalSettings.EventType.ADD;
            curr.elementType = EntGL.ElementType.PARTICLE;
            arr.push(curr);
        }
        for(index in this.createFunctions){
            curr = this.createFunctions[index]();
            curr.eventType = GraphicalSettings.EventType.ADD;
            arr.push(curr);
        }
        for(index in this.removeFunctions){
            for(var types in EntGL.ElementType){
                curr = this.removeFunctions[index]();
                curr.eventType = GraphicalSettings.EventType.REMOVE;
                curr.elementType = EntGL.ElementType[types];
                curr.id = curr.id + types;
                arr.push(curr)
            }
        }
        return arr;
    }
}