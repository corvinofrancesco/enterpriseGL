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