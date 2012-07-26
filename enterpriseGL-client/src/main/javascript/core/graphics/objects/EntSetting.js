function EntSetting(condition, action, event){
    this.id = "new";
    this.eventType = GraphicalSettings.EventType.ADD;
    this.elementType = EntGL.ElementType.Particle;       
    this.defaultAction = action || function(event,scene,element,system){};
    this._condition = condition || function(element){return true;};
    this.duration = 0;
    this._isAdvancedEvent = false;
    this._advConstructor = EntGraphicalEvent;
    this._advProps = [];
}

EntSetting.prototype = {
    verifyCondition: function(element){
        return this._condition(element);
    },
    
    configureForAdvEvent: function(constructor, props){
        this._advConstructor = constructor;
        this._advProps = props;
        this._isAdvancedEvent = true;
    },
    
    create: function(element){
        var e = null;
        if(this._isAdvancedEvent){
            e = new this._advConstructor(
                element,
                this.defaultAction, 
                this._advProps);
        } else {
            e = new EntGraphicalEvent(
                element,
                this.defaultAction,
                this.duration);            
        }
        e.settingGen = this.id;
        return e;
    }
}

//EntSetting.createParticleFunctions = {
//    particleGeom: function(){
//        var action = function(event,scene,element,system){
//            if(element instanceof EntElement){
//                // creation of element
//                var primitive = new ParticleGeomPrimitive();
//                primitive.linkToModel(element);
//                var cond = Math.random();
//                if(cond<0.5){ // sphere
//                    primitive.typePrimitive = ParticleGeomPrimitive.Primitive.SPHERE;                  
//                } else { // cube
//                    primitive.dimension = 1;                            
//                }
//                if(primitive.create()==null) return;
//                event._element = primitive;
//                event.settingGen = "createParticleGeom";
//                scene.add(primitive.getElement());
//                system.add(primitive.getElement())
//                return;
//            }
//        };
//        // all particles
//        var condition = function(element){return true;};
//        var sett =  new EntSetting(condition,action);        
//        sett.id = "createParticleGeom";
//        return sett;
//    },
//    particleAthom: function(){
//        var sett = new EntSetting(
//            function(element){return false;},
//            function(event,scene,element,system){}); 
//        sett.id = "createParticleAthom";
//        return sett;
//    } 
//}
//
//EntSetting.createFunctions = {
//    relationAdding: RelationBase.simpleAddingSetting 
//}
//
//EntSetting.removeFunctions = {
//    removeSimple: function(){ 
//        var sett =  new EntSetting(null,function(event,scene,element,system){
//            scene.remove(element.element);            
//        });
//        sett.id = "remove";
//        return sett;
//    }
//}
//
//EntSetting.defaultValues = function(){
//    var arr = [], curr, index;
//    for(index in EntSetting.createParticleFunctions ){
//        curr = EntSetting.createParticleFunctions[index]();
//        curr.eventType = GraphicalSettings.EventType.ADD;
//        curr.elementType = EntGL.ElementType.PARTICLE;
//        arr.push(curr);
//    }
//    for(index in EntSetting.createFunctions){
//        curr = EntSetting.createFunctions[index]();
//        curr.eventType = GraphicalSettings.EventType.ADD;
//        arr.push(curr);
//    }
//    for(index in EntSetting.removeFunctions){
//        for(var types in EntGL.ElementType){
//            curr = EntSetting.removeFunctions[index]();
//            curr.eventType = GraphicalSettings.EventType.REMOVE;
//            curr.elementType = EntGL.ElementType[types];
//            curr.id = curr.id + types;
//            arr.push(curr)
//        }
//    }
//    return arr;
//}