var EntGLTest = function(){
    this.className = "unknow";
}

EntGLTest.prototype = {
    after: function(){
        
    },
    
    before: function(){
        
    },
    
    run: function(){
        var currentTest = this;
        describe("Testing javascript class: " + this.className, function(){
            for(var i in currentTest){
                if( currentTest[i] instanceof Function){
                    if(i.search("test") != -1){
                        currentTest.before();
                        it("execute " + i ,  currentTest[i].call(currentTest));
                        currentTest.after();
                    }
                }                
            }            
        });
    },
    
    configure: function(configs){
        for(var i in this){
            if(this[i] instanceof Function)
                if(i.search("set")==0){                    
                    this[i](configs[i.substring(3)]);
                };
        }
    }
}

EntGLTest.compareVector = function(v1, v2){
    if(v2 instanceof Array){
        v2 = new THREE.Vector3(v2[0],v2[1],v2[2]);
    }
    var ret = 0;
    try {
        ret = v1.clone().subSelf(v2).length();
    } catch(e){ return -1;}
    return ret;
}