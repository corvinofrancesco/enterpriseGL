describe('EntModel Test',function(){
    var graphMoch = {
        lastevent: null,        
        updateModel: function(event){this.lastevent = event;}
    };
    var loaderMoch = {
        isUpdated: function(){return true;},
        wait: function(){}
    };
    var model = EntGL.Model;
    model.graphics = graphMoch;
    model.loader = loaderMoch;
    
    describe('init() testing', function(){
        
    });
    
    describe('goToEvent() testing', function(){
        
    });
    
    describe('playNextEvent() testing', function(){
        
    });
    
    describe('update() testing', function(){

        it("Control if graphics is called ", function(){
//            model.currentEventId = "event10";
//            model.update();
//            expect(graphMoch.lastevent).toBe("event10");
        });

    });
    
});