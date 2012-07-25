function EntSetting(condition, action){
    this.id = "new";
    this.eventType = GraphicalSettings.EventType.ADD;
    this.elementType = EntGL.ElementType.Particle;       
    this.defaultAction = action || function(event,scene,element){};
    this._condition = condition || function(element){return true;};
}

EntSetting.prototype = {
    verifyCondition: function(element){
        return this._condition(element);
    },
    
    create: function(element){
        var e = new EntGraphicalEvent(element,this.defaultAction,0);
        return e;
    }
}

EntSetting.createParticleFunctions = {
    particleCube: function(){
        var sett =  new EntSetting(null,function(event,scene,element){
            if(element instanceof EntElement){
                // creation of element
                var cube = new ParticleGeomPrimitive();
                cube.dimension = 1;        
                event._element = cube;
                scene.add(cube.create());
                return;
            }
        });        
        sett.id = "createParticleCube";
        return sett;
    },
    particleSphere: function(){
        var sett = new EntSetting(null,function(event,scene,element){
            if(element instanceof EntElement){
                // creation of element
                var sphere = new ParticleGeomPrimitive();
                sphere.dimension = 1;       
                sphere.typePrimitive = ParticleGeomPrimitive.Primitive.SPHERE;
                event._element = sphere;
                scene.add(sphere.create());
                return;
            }        
        }); 
        sett.id = "createParticleSphere";
        return sett;
    } 
}

EntSetting.createFunctions = {
    relationAdding: function(){
        var retSet = new EntSetting(null,function(event,scene,element){
        
        });
        retSet.elementType =  EntGL.ElementType.RELATION;
        retSet.id = "createSimpleRelation"
        return retSet;
    }
}

EntSetting.removeFunctions = {
    removeSimple: function(){ 
        var sett =  new EntSetting(null,function(event,scene,element){
            scene.remove(element.element);
        });
        sett.id = "remove";
        return sett;
    }
}

EntSetting.defaultValues = function(){
    var arr = [], curr, index;
    for(index in EntSetting.createParticleFunctions ){
        curr = EntSetting.createParticleFunctions[index]();
        curr.eventType = GraphicalSettings.EventType.ADD;
        curr.elementType = EntGL.ElementType.PARTICLE;
        curr._condition = function(element){
            var cond = Math.floor(Math.random()*2);
            if(cond>1) {element._conditionSel=true; return true;}
            if(element._conditionSel == undefined) element._conditionSel = false;
            else {
                if(!element._conditionSel) return true;
            }
            return false;
        }
        arr.push(curr);
    }
    for(index in EntSetting.createFunctions){
        curr = EntSetting.createFunctions[index]();
        curr.eventType = GraphicalSettings.EventType.ADD;
        arr.push(curr);
    }
    for(index in EntSetting.removeFunctions){
        for(var types in EntGL.ElementType){
            curr = EntSetting.removeFunctions[index]();
            curr.eventType = GraphicalSettings.EventType.REMOVE;
            curr.elementType = EntGL.ElementType[types];
            curr.id = curr.id + types;
            arr.push(curr)
        }
    }
    return arr;
}