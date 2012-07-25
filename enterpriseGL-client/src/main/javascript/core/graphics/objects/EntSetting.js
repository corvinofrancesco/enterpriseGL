function EntSetting(condition, action){
    this.eventType = GraphicalSettings.EventType.ADD;
    this.elementType = GraphicalSettings.ElementType.Particle;       
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

EntSetting.createFunctions = {
    particleCube: new EntSetting(null,function(event,scene,element){
        if(element instanceof EntElement){
            // creation of element
            var cube = new ParticleCube();
            cube.dimension = 1;        
            event._element = cube;
            scene.add(cube.create());
            return;
        }
    }),
    particleSphere: new EntSetting(null,function(event,scene,element){
        
    })
}